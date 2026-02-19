import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { BillingCycleRepository } from '../../infrastructure/database/repositories/billing-cycle.repository';
import { BILLING_EVENTS } from '../../domain/events/billing-events';
import { BillingCycleStatus } from '../../domain/enums';
import { BillingCycleNotFoundException } from '../../errors';
import { BillingCycleRecord } from '../../domain/types';

@Injectable()
export class CancelBillingCycleCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly billingCycleRepo: BillingCycleRepository,
  ) {}

  async execute(billingCycleId: string): Promise<BillingCycleRecord> {
    const cycle = await this.billingCycleRepo.findById(billingCycleId);
    if (!cycle) {
      throw new BillingCycleNotFoundException(billingCycleId);
    }

    const updated = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const result = await tx.billingCycle.update({
        where: { id: billingCycleId },
        data: { status: BillingCycleStatus.CANCELLED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: billingCycleId,
        aggregateType: 'BillingCycle',
        eventType: BILLING_EVENTS.CYCLE_CANCELLED,
        payload: {
          billingCycleId,
          subscriptionId: cycle.subscriptionId,
          customerId: cycle.customerId,
          invoiceNumber: cycle.invoiceNumber,
        },
      });

      return result;
    });

    return updated;
  }
}
