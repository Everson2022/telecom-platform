import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { SagaOrchestrator, SagaDefinition } from '@telecom/toolkit/saga';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { SagaExecutionRepositoryImpl } from '../../infrastructure/database/repositories/saga-execution.repository.impl';
import { OrderNotFoundException, InvalidOrderStatusTransitionException } from '../../errors';
import { ORDER_EVENTS, OrderProcessingStartedPayload } from '../../domain/events/order-events';
import { OrderStatus } from '../../domain/enums';

const PROCESSABLE_STATUSES: OrderStatus[] = [
  OrderStatus.CREATED,
  OrderStatus.VALIDATING,
];

interface OrderSagaContext {
  orderId: string;
  customerId: string;
  type: string;
}

const NEW_PLAN_SAGA: SagaDefinition<OrderSagaContext> = {
  sagaType: 'NewPlanSaga',
  steps: [
    {
      name: 'ValidateCustomer',
      execute: async (_ctx: OrderSagaContext) => { /* stub: implemented via Kafka events */ },
      compensate: async (_ctx: OrderSagaContext) => { /* no compensation needed */ },
    },
    {
      name: 'ProcessPayment',
      execute: async (_ctx: OrderSagaContext) => { /* stub: implemented via Kafka events */ },
      compensate: async (_ctx: OrderSagaContext) => { /* stub: refund */ },
    },
    {
      name: 'AllocateSim',
      execute: async (_ctx: OrderSagaContext) => { /* stub: implemented via Kafka events */ },
      compensate: async (_ctx: OrderSagaContext) => { /* stub: release SIM */ },
    },
    {
      name: 'ActivateLine',
      execute: async (_ctx: OrderSagaContext) => { /* stub: implemented via Kafka events */ },
      compensate: async (_ctx: OrderSagaContext) => { /* stub: deactivate line */ },
    },
  ],
};

@Injectable()
export class ProcessOrderCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly orderRepo: OrderRepository,
    private readonly sagaExecutionRepo: SagaExecutionRepositoryImpl,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    const currentStatus = order.status as OrderStatus;

    if (!PROCESSABLE_STATUSES.includes(currentStatus)) {
      throw new InvalidOrderStatusTransitionException(currentStatus, OrderStatus.PROCESSING);
    }

    // 1. Persist status transition + outbox event inside transaction
    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.PROCESSING },
      });

      const payload: OrderProcessingStartedPayload = {
        orderId,
        customerId: order.customerId,
      };

      await this.outboxRepo.create(tx, {
        aggregateId: orderId,
        aggregateType: 'Order',
        eventType: ORDER_EVENTS.PROCESSING_STARTED,
        payload: payload as unknown as Record<string, unknown>,
      });
    });

    // 2. Start saga OUTSIDE the transaction to avoid nested transaction issues
    const orchestrator = new SagaOrchestrator<OrderSagaContext>(
      NEW_PLAN_SAGA,
      this.sagaExecutionRepo,
    );

    const sagaContext: OrderSagaContext = {
      orderId,
      customerId: order.customerId,
      type: order.type,
    };

    await orchestrator.start(orderId, sagaContext);
  }
}
