import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { OrderNotFoundException, OrderAlreadyCancelledException, InvalidOrderStatusTransitionException } from '../../errors';
import { ORDER_EVENTS, OrderCancelledPayload } from '../../domain/events/order-events';
import { OrderStatus } from '../../domain/enums';

const NON_CANCELLABLE_STATUSES: OrderStatus[] = [
  OrderStatus.COMPLETED,
  OrderStatus.FAILED,
];

@Injectable()
export class CancelOrderCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    const currentStatus = order.status as OrderStatus;

    if (currentStatus === OrderStatus.CANCELLED) {
      throw new OrderAlreadyCancelledException();
    }

    if (NON_CANCELLABLE_STATUSES.includes(currentStatus)) {
      throw new InvalidOrderStatusTransitionException(currentStatus, OrderStatus.CANCELLED);
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELLED },
      });

      const payload: OrderCancelledPayload = {
        orderId,
        customerId: order.customerId,
      };

      await this.outboxRepo.create(tx, {
        aggregateId: orderId,
        aggregateType: 'Order',
        eventType: ORDER_EVENTS.CANCELLED,
        payload: payload as unknown as Record<string, unknown>,
      });
    });
  }
}
