import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { SubscriptionStatus, LineStatus } from '../../domain/enums';
import { SubscriptionNotFoundException } from '../../errors';
import { SubscriptionRecord } from '../../domain/types';

@Injectable()
export class SuspendSubscriptionCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly serviceLineRepo: ServiceLineRepository,
  ) {}

  async execute(subscriptionId: string): Promise<SubscriptionRecord> {
    const subscription = await this.subscriptionRepo.findById(subscriptionId);
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    const updated = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const result = await tx.subscription.update({
        where: { id: subscriptionId },
        data: { status: SubscriptionStatus.SUSPENDED },
      });

      await tx.serviceLine.updateMany({
        where: { subscriptionId, status: LineStatus.ACTIVE },
        data: { status: LineStatus.SUSPENDED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: subscriptionId,
        aggregateType: 'Subscription',
        eventType: SERVICE_INVENTORY_EVENTS.SUBSCRIPTION_SUSPENDED,
        payload: {
          subscriptionId,
          customerId: subscription.customerId,
          planType: subscription.planType,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: subscriptionId,
        aggregateType: 'Subscription',
        eventType: SERVICE_INVENTORY_EVENTS.ALL_LINES_SUSPENDED,
        payload: {
          subscriptionId,
          customerId: subscription.customerId,
        },
      });

      return result;
    });

    return updated;
  }
}
