import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { LineActivationRepository } from '../../infrastructure/database/repositories/line-activation.repository';
import { FakeNetworkCoreClient } from '../../infrastructure/core/fake-network-core.client';
import { ACTIVATION_EVENTS } from '../../domain/events/activation-events';
import { ActivationStatus } from '../../domain/enums';
import { LineActivationNotFoundException } from '../../errors';

@Injectable()
export class ReactivateLineCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly lineActivationRepo: LineActivationRepository,
    private readonly coreClient: FakeNetworkCoreClient,
  ) {}

  async execute(msisdn: string): Promise<void> {
    const activation = await this.lineActivationRepo.findByMsisdn(msisdn);
    if (!activation) {
      throw new LineActivationNotFoundException(msisdn);
    }

    // Chama CORE fake (sempre sucesso)
    await this.coreClient.reactivateSubscriber(msisdn);

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.lineActivation.update({
        where: { id: activation.id },
        data: { status: ActivationStatus.ACTIVATED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: activation.id,
        aggregateType: 'LineActivation',
        eventType: ACTIVATION_EVENTS.LINE_REACTIVATED,
        payload: {
          activationId: activation.id,
          msisdn,
          customerId: activation.customerId,
        },
      });
    });
  }
}
