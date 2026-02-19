import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { ORDER_EVENTS, OrderCreatedPayload } from '../../domain/events/order-events';
import { OrderStatus, OrderType } from '../../domain/enums';

export interface CreateOrderItemInput {
  offerId: string;
  quantity: number;
  priceAmountCents: number;
  priceCurrency?: string;
}

export interface CreateOrderInput {
  customerId: string;
  type: OrderType;
  totalAmountCents: number;
  currency?: string;
  paymentMethodType: string;
  items: CreateOrderItemInput[];
}

@Injectable()
export class CreateOrderCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<string> {
    const orderId = uuidv7();
    const currency = input.currency ?? 'BRL';

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.order.create({
        data: {
          id: orderId,
          customerId: input.customerId,
          type: input.type,
          status: OrderStatus.CREATED,
          totalAmountCents: input.totalAmountCents,
          currency,
          paymentMethodType: input.paymentMethodType,
        },
      });

      for (const item of input.items) {
        await tx.orderItem.create({
          data: {
            id: uuidv7(),
            orderId,
            offerId: item.offerId,
            quantity: item.quantity,
            priceAmountCents: item.priceAmountCents,
            priceCurrency: item.priceCurrency ?? 'BRL',
          },
        });
      }

      const payload: OrderCreatedPayload = {
        orderId,
        customerId: input.customerId,
        type: input.type,
        totalAmountCents: input.totalAmountCents,
        currency,
        paymentMethodType: input.paymentMethodType,
        items: input.items.map((item) => ({
          offerId: item.offerId,
          quantity: item.quantity,
          priceAmountCents: item.priceAmountCents,
        })),
      };

      await this.outboxRepo.create(tx, {
        aggregateId: orderId,
        aggregateType: 'Order',
        eventType: ORDER_EVENTS.CREATED,
        payload: payload as unknown as Record<string, unknown>,
      });
    });

    return orderId;
  }
}
