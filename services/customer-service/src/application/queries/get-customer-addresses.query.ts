import { Injectable } from '@nestjs/common';
import { CustomerAddress } from '@prisma/client';
import { GrpcError } from '@telecom/toolkit';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { AddressRepository } from '../../infrastructure/database/repositories/address.repository';

@Injectable()
export class GetCustomerAddressesQuery {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly addressRepo: AddressRepository,
  ) {}

  async execute(customerId: string): Promise<CustomerAddress[]> {
    const exists = await this.customerRepo.exists(customerId);
    if (!exists) {
      throw new GrpcError(GrpcStatus.NOT_FOUND, `Customer ${customerId} not found`);
    }
    return this.addressRepo.findByCustomerId(customerId);
  }
}
