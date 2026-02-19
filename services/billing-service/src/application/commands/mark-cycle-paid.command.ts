import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { BillingCycleRepository } from '../../infrastructure/database/repositories/billing-cycle.repository';
import { BILLING_EVENTS } from '../../domain/events/billing-events';
import { BillingCycleStatus } from '../../domain/enums';
import { BillingCycleNotFoundException } from '../../errors';
import { BillingCycleRecord } from '../../domain/types';

export interface MarkCyclePaidInput {
  billingCycleId: string;
  paymentTransactionId: string;
}

@Injectable()
export class MarkCyclePaidCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly billingCycleRepo: BillingCycleRepository,
  ) {}

  async execute(input: MarkCyclePaidInput): Promise<BillingCycleRecord> {
    const cycle = await this.billingCycleRepo.findById(input.billingCycleId);
    if (!cycle) {
      throw new BillingCycleNotFoundException(input.billingCycleId);
    }

    const updated = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const result = await tx.billingCycle.update({
        where: { id: input.billingCycleId },
        data: {
          status: BillingCycleStatus.PAID,
          paymentTransactionId: input.paymentTransactionId,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: input.billingCycleId,
        aggregateType: 'BillingCycle',
        eventType: BILLING_EVENTS.CYCLE_PAID,
        payload: {
          billingCycleId: input.billingCycleId,
          subscriptionId: cycle.subscriptionId,
          customerId: cycle.customerId,
          invoiceNumber: cycle.invoiceNumber,
          paymentTransactionId: input.paymentTransactionId,
          amountCents: cycle.amountCents,
          currency: cycle.currency,
        },
      });

      return result;
    });

    return updated;
  }
}
