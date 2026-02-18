import { Injectable, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { RecurringBillingRepository } from '../../infrastructure/database/repositories/recurring-billing.repository';
import { PaymentMethodNotFoundException } from '../../errors/payment-method-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { PaymentMethodStatus, RecurringStatus } from '../../domain/enums';
import { ActivateRecurringBillingDto } from '../../presentation/dto/activate-recurring-billing.dto';

function computeNextBillingDate(billingDay: number): Date {
  const today = new Date();
  const candidate = new Date(today.getFullYear(), today.getMonth(), billingDay);
  if (candidate <= today) {
    candidate.setMonth(candidate.getMonth() + 1);
  }
  return candidate;
}

@Injectable()
export class ActivateRecurringBillingCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentMethodRepo: PaymentMethodRepository,
    private readonly recurringBillingRepo: RecurringBillingRepository,
  ) {}

  async execute(dto: ActivateRecurringBillingDto): Promise<string> {
    const method = await this.paymentMethodRepo.findById(dto.paymentMethodId);
    if (!method) {
      throw new PaymentMethodNotFoundException(dto.paymentMethodId);
    }
    if (method.status !== PaymentMethodStatus.ACTIVE) {
      throw new ConflictException(`Payment method ${dto.paymentMethodId} is not active`);
    }

    const existing = await this.recurringBillingRepo.findBySubscription(dto.subscriptionId);
    if (existing) {
      throw new ConflictException(
        `Recurring billing already exists for subscription ${dto.subscriptionId}`,
      );
    }

    const recurringBillingId = uuidv4();
    const nextBillingDate = computeNextBillingDate(dto.billingDay);

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.recurringBilling.create({
        data: {
          id: recurringBillingId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          paymentMethodId: dto.paymentMethodId,
          amountCents: dto.amountCents,
          currency: dto.currency ?? 'BRL',
          billingDay: dto.billingDay,
          status: RecurringStatus.ACTIVE,
          nextBillingDate,
          maxRetries: dto.maxRetries ?? 3,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: recurringBillingId,
        aggregateType: 'RecurringBilling',
        eventType: PAYMENT_EVENTS.RECURRING_ACTIVATED,
        payload: {
          recurringBillingId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          paymentMethodId: dto.paymentMethodId,
          amountCents: dto.amountCents,
          currency: dto.currency ?? 'BRL',
          billingDay: dto.billingDay,
          nextBillingDate: nextBillingDate.toISOString().split('T')[0],
        },
      });
    });

    return recurringBillingId;
  }
}
