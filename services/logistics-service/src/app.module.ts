import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { ShipmentRepository } from './infrastructure/database/repositories/shipment.repository';
import { FakeCarrierClient } from './infrastructure/carrier/fake-carrier.client';
import { LogisticsOutboxStore } from './infrastructure/kafka/logistics-outbox.store';
import { CreateShipmentCommand } from './application/commands/create-shipment.command';
import { UpdateShipmentStatusCommand } from './application/commands/update-shipment-status.command';
import { GetShipmentByIdQuery } from './application/queries/get-shipment-by-id.query';
import { GetShipmentByOrderIdQuery } from './application/queries/get-shipment-by-order-id.query';
import { ListShipmentsByCustomerQuery } from './application/queries/list-shipments-by-customer.query';
import { ShipmentController } from './presentation/rest/shipment.controller';

@Module({
  imports: [],
  controllers: [ShipmentController],
  providers: [
    PrismaService,
    ShipmentRepository,
    FakeCarrierClient,
    LogisticsOutboxStore,
    CreateShipmentCommand,
    UpdateShipmentStatusCommand,
    GetShipmentByIdQuery,
    GetShipmentByOrderIdQuery,
    ListShipmentsByCustomerQuery,
  ],
})
export class AppModule {}
