import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { RecurringBillingRepository } from '../../infrastructure/database/repositories/recurring-billing.repository';
import { RecurringBillingNotFoundException } from '../../errors/recurring-billing-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { TransactionType, TransactionStatus, RecurringStatus } from '../../domain/enums';

function addOneMonth(date: Date): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  return next;
}

@Injectable()
export class ProcessRecurringBillingCommand {
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

    const transactionId = uuidv7();
    const idempotencyKey = `recurring:${recurringBillingId}:${billing.nextBillingDate.toISOString()}`;

    // Simulate gateway (approve by default)
    const approved = true;
    const today = new Date();

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      if (approved) {
        await tx.paymentTransaction.create({
          data: {
            id: transactionId,
            paymentMethodId: billing.paymentMethodId,
            customerId: billing.customerId,
            subscriptionId: billing.subscriptionId,
            type: TransactionType.RECURRING,
            status: TransactionStatus.APPROVED,
            amountCents: billing.amountCents,
            currency: billing.currency,
            gatewayTransactionId: uuidv7(),
            idempotencyKey,
          },
        });

        const nextBillingDate = addOneMonth(billing.nextBillingDate);
        await tx.recurringBilling.update({
          where: { id: recurringBillingId },
          data: {
            lastBillingDate: today,
            nextBillingDate,
            consecutiveFailures: 0,
          },
        });

        await this.outboxRepo.create(tx, {
          aggregateId: recurringBillingId,
          aggregateType: 'RecurringBilling',
          eventType: PAYMENT_EVENTS.RECURRING_PROCESSED,
          payload: {
            recurringBillingId,
            transactionId,
            customerId: billing.customerId,
            subscriptionId: billing.subscriptionId,
            amountCents: billing.amountCents,
            nextBillingDate: nextBillingDate.toISOString().split('T')[0],
          },
        });
      } else {
        const newFailures = billing.consecutiveFailures + 1;
        const maxRetriesExceeded = newFailures >= billing.maxRetries;

        await tx.paymentTransaction.create({
          data: {
            id: transactionId,
            paymentMethodId: billing.paymentMethodId,
            customerId: billing.customerId,
            subscriptionId: billing.subscriptionId,
            type: TransactionType.RECURRING,
            status: TransactionStatus.DECLINED,
            amountCents: billing.amountCents,
            currency: billing.currency,
            failureReason: 'Gateway declined',
            idempotencyKey,
          },
        });

        await tx.recurringBilling.update({
          where: { id: recurringBillingId },
          data: {
            consecutiveFailures: newFailures,
            status: maxRetriesExceeded ? RecurringStatus.PAUSED : RecurringStatus.ACTIVE,
          },
        });

        await this.outboxRepo.create(tx, {
          aggregateId: recurringBillingId,
          aggregateType: 'RecurringBilling',
          eventType: maxRetriesExceeded
            ? PAYMENT_EVENTS.RECURRING_MAX_RETRIES_EXCEEDED
            : PAYMENT_EVENTS.RECURRING_FAILED,
          payload: {
            recurringBillingId,
            customerId: billing.customerId,
            subscriptionId: billing.subscriptionId,
            amountCents: billing.amountCents,
            consecutiveFailures: newFailures,
            failureReason: 'Gateway declined',
          },
        });

        if (maxRetriesExceeded) {
          await this.outboxRepo.create(tx, {
            aggregateId: recurringBillingId,
            aggregateType: 'RecurringBilling',
            eventType: PAYMENT_EVENTS.OVERDUE,
            payload: {
              customerId: billing.customerId,
              subscriptionId: billing.subscriptionId,
              amountCents: billing.amountCents,
              recurringBillingId,
            },
          });
        }
      }
    });
  }
}
