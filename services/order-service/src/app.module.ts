import { Module } from '@nestjs/common';

// Infrastructure
import { PrismaService } from './infrastructure/database/prisma.service';
import { OrderRepository } from './infrastructure/database/repositories/order.repository';
import { SagaExecutionRepositoryImpl } from './infrastructure/database/repositories/saga-execution.repository.impl';
import { OrderOutboxStore } from './infrastructure/kafka/order-outbox.store';
import { OrderGrpcController } from './infrastructure/grpc/order-grpc.controller';

// Commands
import { CreateOrderCommand } from './application/commands/create-order.command';
import { CancelOrderCommand } from './application/commands/cancel-order.command';
import { ProcessOrderCommand } from './application/commands/process-order.command';

// Queries
import { GetOrderQuery } from './application/queries/get-order.query';
import { ListOrdersQuery } from './application/queries/list-orders.query';

// Controllers
import { OrderController } from './presentation/rest/order.controller';

@Module({
  controllers: [
    OrderController,
    OrderGrpcController,
  ],
  providers: [
    // Infrastructure
    PrismaService,
    OrderRepository,
    SagaExecutionRepositoryImpl,
    OrderOutboxStore,

    // Commands
    CreateOrderCommand,
    CancelOrderCommand,
    ProcessOrderCommand,

    // Queries
    GetOrderQuery,
    ListOrdersQuery,
  ],
  exports: [PrismaService],
})
export class AppModule {}
