import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { RecurringBillingRepository } from '../../infrastructure/database/repositories/recurring-billing.repository';
import { RecurringBillingNotFoundException } from '../../errors/recurring-billing-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { RecurringStatus } from '../../domain/enums';

@Injectable()
export class CancelRecurringBillingCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly recurringBillingRepo: RecurringBillingRepository,
  ) {}

  async execute(recurringBillingId: string): Promise<void> {
    const billing = await this.recurringBillingRepo.findById(recurringBillingId);
    if (!billing) {
      throw new RecurringBillingNotFoundException(recurringBillingId);
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.recurringBilling.update({
        where: { id: recurringBillingId },
        data: { status: RecurringStatus.CANCELLED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: recurringBillingId,
        aggregateType: 'RecurringBilling',
        eventType: PAYMENT_EVENTS.RECURRING_CANCELLED,
        payload: {
          recurringBillingId,
          customerId: billing.customerId,
          subscriptionId: billing.subscriptionId,
        },
      });
    });
  }
}
