import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { CustomerRepository } from './infrastructure/database/repositories/customer.repository';
import { DocumentRepository } from './infrastructure/database/repositories/document.repository';
import { AddressRepository } from './infrastructure/database/repositories/address.repository';
import { CustomerOutboxStore } from './infrastructure/kafka/customer-outbox.store';
import { RegisterCustomerCommand } from './application/commands/register-customer.command';
import { UpdateCustomerCommand } from './application/commands/update-customer.command';
import { AddDocumentCommand } from './application/commands/add-document.command';
import { VerifyDocumentCommand } from './application/commands/verify-document.command';
import { AddAddressCommand } from './application/commands/add-address.command';
import { ChangeStatusCommand } from './application/commands/change-status.command';
import { GetCustomerQuery } from './application/queries/get-customer.query';
import { ListCustomersQuery } from './application/queries/list-customers.query';
import { CustomerController } from './presentation/rest/customer.controller';
import { DocumentController } from './presentation/rest/document.controller';
import { AddressController } from './presentation/rest/address.controller';
import { CustomerGrpcController } from './infrastructure/grpc/customer-grpc.controller';

@Module({
  controllers: [
    CustomerController,
    DocumentController,
    AddressController,
    CustomerGrpcController,
  ],
  providers: [
    PrismaService,
    CustomerRepository,
    DocumentRepository,
    AddressRepository,
    CustomerOutboxStore,
    RegisterCustomerCommand,
    UpdateCustomerCommand,
    AddDocumentCommand,
    VerifyDocumentCommand,
    AddAddressCommand,
    ChangeStatusCommand,
    GetCustomerQuery,
    ListCustomersQuery,
  ],
  exports: [PrismaService],
})
export class AppModule {}
