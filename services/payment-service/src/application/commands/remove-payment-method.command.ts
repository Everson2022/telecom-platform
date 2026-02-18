import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { PaymentMethodNotFoundException } from '../../errors/payment-method-not-found.exception';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { PaymentMethodStatus } from '../../domain/enums';

@Injectable()
export class RemovePaymentMethodCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentMethodRepo: PaymentMethodRepository,
  ) {}

  async execute(paymentMethodId: string): Promise<void> {
    const method = await this.paymentMethodRepo.findById(paymentMethodId);
    if (!method) {
      throw new PaymentMethodNotFoundException(paymentMethodId);
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.paymentMethod.update({
        where: { id: paymentMethodId },
        data: { status: PaymentMethodStatus.INACTIVE },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: paymentMethodId,
        aggregateType: 'PaymentMethod',
        eventType: PAYMENT_EVENTS.METHOD_REMOVED,
        payload: {
          paymentMethodId,
          customerId: method.customerId,
          subscriptionId: method.subscriptionId,
        },
      });
    });
  }
}
