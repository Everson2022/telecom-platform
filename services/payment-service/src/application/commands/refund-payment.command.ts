import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PaymentTransactionRepository } from '../../infrastructure/database/repositories/payment-transaction.repository';
import { TransactionNotFoundException } from '../../errors/transaction-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { TransactionType, TransactionStatus } from '../../domain/enums';
import { PaymentTransactionRecord } from '../../domain/types';

@Injectable()
export class RefundPaymentCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionRepo: PaymentTransactionRepository,
  ) {}

  async execute(originalTransactionId: string): Promise<PaymentTransactionRecord> {
    const original = await this.transactionRepo.findById(originalTransactionId);
    if (!original) {
      throw new TransactionNotFoundException(originalTransactionId);
    }
    if (original.status !== TransactionStatus.APPROVED) {
      throw new BadRequestException(
        `Transaction ${originalTransactionId} cannot be refunded — status is ${original.status}`,
      );
    }

    const refundId = uuidv4();
    const gatewayTransactionId = uuidv4();
    let result!: PaymentTransactionRecord;

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.paymentTransaction.update({
        where: { id: originalTransactionId },
        data: { status: TransactionStatus.REFUNDED },
      });

      const refund = await tx.paymentTransaction.create({
        data: {
          id: refundId,
          paymentMethodId: original.paymentMethodId,
          customerId: original.customerId,
          subscriptionId: original.subscriptionId,
          orderId: original.orderId,
          type: TransactionType.REFUND,
          status: TransactionStatus.APPROVED,
          amountCents: original.amountCents,
          currency: original.currency,
          gatewayTransactionId,
          idempotencyKey: `refund:${originalTransactionId}`,
        },
      });
      result = refund;

      await this.outboxRepo.create(tx, {
        aggregateId: refundId,
        aggregateType: 'PaymentTransaction',
        eventType: PAYMENT_EVENTS.REFUNDED,
        payload: {
          transactionId: refundId,
          originalTransactionId,
          paymentMethodId: original.paymentMethodId,
          customerId: original.customerId,
          subscriptionId: original.subscriptionId,
          amountCents: original.amountCents,
          gatewayTransactionId,
        },
      });
    });

    return result;
  }
}
