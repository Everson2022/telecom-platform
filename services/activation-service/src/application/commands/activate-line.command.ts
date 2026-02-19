import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { LineActivationRepository } from '../../infrastructure/database/repositories/line-activation.repository';
import { MsisdnPoolRepository } from '../../infrastructure/database/repositories/msisdn-pool.repository';
import { FakeNetworkCoreClient } from '../../infrastructure/core/fake-network-core.client';
import { ACTIVATION_EVENTS } from '../../domain/events/activation-events';
import { ActivationStatus, MsisdnStatus } from '../../domain/enums';
import { LineActivationRecord } from '../../domain/types';

export interface ActivateLineInput {
  orderId: string;
  customerId: string;
  iccid: string;
  imsi?: string;
  dddCode: string;
}

@Injectable()
export class ActivateLineCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly lineActivationRepo: LineActivationRepository,
    private readonly msisdnPoolRepo: MsisdnPoolRepository,
    private readonly coreClient: FakeNetworkCoreClient,
  ) {}

  async execute(input: ActivateLineInput): Promise<LineActivationRecord | null> {
    // Idempotencia: retorna ativacao existente sem reprocessar
    const existing = await this.lineActivationRepo.findByOrderId(input.orderId);
    if (existing) {
      return existing;
    }

    // Busca MSISDN disponivel para o DDD
    const availableMsisdn = await this.msisdnPoolRepo.findFirstAvailable(input.dddCode);

    if (!availableMsisdn) {
      await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
        await this.outboxRepo.create(tx, {
          aggregateId: input.orderId,
          aggregateType: 'LineActivation',
          eventType: ACTIVATION_EVENTS.MSISDN_RESERVATION_FAILED,
          payload: {
            orderId: input.orderId,
            customerId: input.customerId,
            dddCode: input.dddCode,
            reason: `No MSISDN available for DDD ${input.dddCode}`,
          },
        });
      });
      return null;
    }

    // Chama CORE de rede fake (sempre retorna sucesso)
    const coreResult = await this.coreClient.provisionSubscriber({
      iccid: input.iccid,
      imsi: input.imsi,
      msisdn: availableMsisdn.msisdn,
    });

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Atualiza MSISDN para ACTIVE
      await tx.msisdnPool.update({
        where: { id: availableMsisdn.id },
        data: {
          status: MsisdnStatus.ACTIVE,
          assignedToCustomerId: input.customerId,
          reservedForOrderId: input.orderId,
        },
      });

      // Cria LineActivation
      const activation = await tx.lineActivation.create({
        data: {
          orderId: input.orderId,
          customerId: input.customerId,
          iccid: input.iccid,
          imsi: input.imsi,
          msisdn: availableMsisdn.msisdn,
          status: ActivationStatus.ACTIVATED,
          coreTransactionId: coreResult.coreTransactionId,
          networkResponse: { success: true, coreTransactionId: coreResult.coreTransactionId },
        },
      });

      // Emite evento MSISDN reservado + linha ativada
      await this.outboxRepo.create(tx, {
        aggregateId: availableMsisdn.id,
        aggregateType: 'MsisdnPool',
        eventType: ACTIVATION_EVENTS.MSISDN_RESERVED,
        payload: {
          msisdn: availableMsisdn.msisdn,
          dddCode: input.dddCode,
          orderId: input.orderId,
          customerId: input.customerId,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: activation.id,
        aggregateType: 'LineActivation',
        eventType: ACTIVATION_EVENTS.LINE_ACTIVATED,
        payload: {
          activationId: activation.id,
          orderId: input.orderId,
          customerId: input.customerId,
          iccid: input.iccid,
          msisdn: availableMsisdn.msisdn,
          coreTransactionId: coreResult.coreTransactionId,
        },
      });

      return activation;
    });

    return result;
  }
}
