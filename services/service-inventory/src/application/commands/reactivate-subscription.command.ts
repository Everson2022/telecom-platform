import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { SubscriptionStatus, LineStatus } from '../../domain/enums';
import { SubscriptionNotFoundException } from '../../errors';
import { SubscriptionRecord } from '../../domain/types';

@Injectable()
export class ReactivateSubscriptionCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionRepo: SubscriptionRepository,
  ) {}

  async execute(subscriptionId: string): Promise<SubscriptionRecord> {
    const subscription = await this.subscriptionRepo.findById(subscriptionId);
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    const updated = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const result = await tx.subscription.update({
        where: { id: subscriptionId },
        data: { status: SubscriptionStatus.ACTIVE },
      });

      await tx.serviceLine.updateMany({
        where: { subscriptionId, status: LineStatus.SUSPENDED },
        data: { status: LineStatus.ACTIVE },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: subscriptionId,
        aggregateType: 'Subscription',
        eventType: SERVICE_INVENTORY_EVENTS.SUBSCRIPTION_REACTIVATED,
        payload: {
          subscriptionId,
          customerId: subscription.customerId,
          planType: subscription.planType,
          paymentMethodId: subscription.paymentMethodId,
          monthlyAmountCents: subscription.monthlyAmountCents,
          currency: subscription.currency,
        },
      });

      return result;
    });

    return updated;
  }
}
