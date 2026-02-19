import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { LineActivationRepository } from '../../infrastructure/database/repositories/line-activation.repository';
import { MsisdnPoolRepository } from '../../infrastructure/database/repositories/msisdn-pool.repository';
import { FakeNetworkCoreClient } from '../../infrastructure/core/fake-network-core.client';
import { ACTIVATION_EVENTS } from '../../domain/events/activation-events';
import { ActivationStatus, MsisdnStatus } from '../../domain/enums';
import { LineActivationNotFoundException } from '../../errors';

const QUARANTINE_DAYS = 180;

@Injectable()
export class DeactivateLineCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly lineActivationRepo: LineActivationRepository,
    private readonly msisdnPoolRepo: MsisdnPoolRepository,
    private readonly coreClient: FakeNetworkCoreClient,
  ) {}

  async execute(orderId: string): Promise<void> {
    const activation = await this.lineActivationRepo.findByOrderId(orderId);
    if (!activation) {
      throw new LineActivationNotFoundException(orderId);
    }

    // Chama CORE fake (sempre sucesso)
    await this.coreClient.deactivateSubscriber(activation.msisdn);

    const quarantineUntil = new Date();
    quarantineUntil.setDate(quarantineUntil.getDate() + QUARANTINE_DAYS);

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Atualiza LineActivation para DEACTIVATED
      await tx.lineActivation.update({
        where: { id: activation.id },
        data: { status: ActivationStatus.DEACTIVATED },
      });

      // Busca MSISDN pelo numero e coloca em quarentena
      const msisdnRecord = await this.msisdnPoolRepo.findByMsisdn(activation.msisdn, tx);
      if (msisdnRecord) {
        await tx.msisdnPool.update({
          where: { id: msisdnRecord.id },
          data: {
            status: MsisdnStatus.QUARANTINE,
            quarantineUntil,
            assignedToCustomerId: null,
            reservedForOrderId: null,
          },
        });
      }

      // Emite evento de linha desativada
      await this.outboxRepo.create(tx, {
        aggregateId: activation.id,
        aggregateType: 'LineActivation',
        eventType: ACTIVATION_EVENTS.LINE_DEACTIVATED,
        payload: {
          activationId: activation.id,
          orderId,
          msisdn: activation.msisdn,
          customerId: activation.customerId,
        },
      });

      // Emite evento de MSISDN liberado (em quarentena)
      await this.outboxRepo.create(tx, {
        aggregateId: activation.msisdn,
        aggregateType: 'MsisdnPool',
        eventType: ACTIVATION_EVENTS.MSISDN_RELEASED,
        payload: {
          msisdn: activation.msisdn,
          status: MsisdnStatus.QUARANTINE,
          quarantineUntil: quarantineUntil.toISOString(),
        },
      });
    });
  }
}
