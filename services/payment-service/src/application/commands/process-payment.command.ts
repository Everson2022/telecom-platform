import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { PaymentTransactionRepository } from '../../infrastructure/database/repositories/payment-transaction.repository';
import { PaymentMethodNotFoundException } from '../../errors/payment-method-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { PaymentMethodStatus, TransactionStatus } from '../../domain/enums';
import { ProcessPaymentDto } from '../../presentation/dto/process-payment.dto';
import { PaymentTransactionRecord } from '../../domain/types';

@Injectable()
export class ProcessPaymentCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentMethodRepo: PaymentMethodRepository,
    private readonly transactionRepo: PaymentTransactionRepository,
  ) {}

  async execute(dto: ProcessPaymentDto): Promise<PaymentTransactionRecord> {
    const existing = await this.transactionRepo.findByIdempotencyKey(dto.idempotencyKey);
    if (existing) {
      return existing;
    }

    const method = await this.paymentMethodRepo.findById(dto.paymentMethodId);
    if (!method) {
      throw new PaymentMethodNotFoundException(dto.paymentMethodId);
    }
    if (method.status !== PaymentMethodStatus.ACTIVE) {
      throw new BadRequestException(`Payment method ${dto.paymentMethodId} is not active`);
    }

    // Simulate gateway approval (real gateway integration would happen here)
    const gatewayTransactionId = uuidv4();
    const status = TransactionStatus.APPROVED;
    const transactionId = uuidv4();

    let result!: PaymentTransactionRecord;

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const created = await tx.paymentTransaction.create({
        data: {
          id: transactionId,
          paymentMethodId: dto.paymentMethodId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          orderId: dto.orderId ?? null,
          type: dto.type,
          status,
          amountCents: dto.amountCents,
          currency: dto.currency ?? 'BRL',
          gatewayTransactionId,
          idempotencyKey: dto.idempotencyKey,
        },
      });
      result = created;

      await this.outboxRepo.create(tx, {
        aggregateId: transactionId,
        aggregateType: 'PaymentTransaction',
        eventType: PAYMENT_EVENTS.PROCESSED,
        payload: {
          transactionId,
          paymentMethodId: dto.paymentMethodId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          orderId: dto.orderId ?? null,
          amountCents: dto.amountCents,
          currency: dto.currency ?? 'BRL',
          gatewayTransactionId,
          type: dto.type,
        },
      });
    });

    return result;
  }
}
