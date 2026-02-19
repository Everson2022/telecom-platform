import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { BillingCycleRepository } from '../../infrastructure/database/repositories/billing-cycle.repository';
import { BILLING_EVENTS } from '../../domain/events/billing-events';
import { BillingCycleStatus } from '../../domain/enums';
import { DuplicateBillingCycleException } from '../../errors';
import { BillingCycleRecord } from '../../domain/types';

export interface GenerateBillingCycleInput {
  subscriptionId: string;
  customerId: string;
  cycleStartDate: Date;
  cycleEndDate: Date;
  dueDate: Date;
  amountCents: number;
  currency?: string;
}

@Injectable()
export class GenerateBillingCycleCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly billingCycleRepo: BillingCycleRepository,
  ) {}

  private generateInvoiceNumber(subscriptionId: string, cycleStartDate: Date): string {
    const year = cycleStartDate.getFullYear();
    const month = String(cycleStartDate.getMonth() + 1).padStart(2, '0');
    const shortId = subscriptionId.replace(/-/g, '').substring(0, 8).toUpperCase();
    return `INV-${year}${month}-${shortId}`;
  }

  async execute(input: GenerateBillingCycleInput): Promise<BillingCycleRecord> {
    // Verifica duplicidade pelo cycleStartDate + subscriptionId
    const existing = await this.billingCycleRepo.findCurrentBySubscription(
      input.subscriptionId,
      input.cycleStartDate,
    );
    if (existing) {
      const period = `${input.cycleStartDate.toISOString().substring(0, 7)}`;
      throw new DuplicateBillingCycleException(input.subscriptionId, period);
    }

    const invoiceNumber = this.generateInvoiceNumber(input.subscriptionId, input.cycleStartDate);

    const cycle = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const created = await tx.billingCycle.create({
        data: {
          subscriptionId: input.subscriptionId,
          customerId: input.customerId,
          cycleStartDate: input.cycleStartDate,
          cycleEndDate: input.cycleEndDate,
          dueDate: input.dueDate,
          amountCents: input.amountCents,
          currency: input.currency ?? 'BRL',
          status: BillingCycleStatus.GENERATED,
          invoiceNumber,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: created.id,
        aggregateType: 'BillingCycle',
        eventType: BILLING_EVENTS.CYCLE_GENERATED,
        payload: {
          billingCycleId: created.id,
          subscriptionId: input.subscriptionId,
          customerId: input.customerId,
          invoiceNumber,
          amountCents: input.amountCents,
          currency: created.currency,
          dueDate: input.dueDate.toISOString(),
          cycleStartDate: input.cycleStartDate.toISOString(),
          cycleEndDate: input.cycleEndDate.toISOString(),
        },
      });

      return created;
    });

    return cycle;
  }
}
