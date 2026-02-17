import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor, GrpcError } from '@telecom/toolkit';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { GetCustomerQuery } from '../../application/queries/get-customer.query';
import { CustomerRepository } from '../database/repositories/customer.repository';
import { AddressRepository } from '../database/repositories/address.repository';
import { CustomerWithRelations } from '../../domain/types';
import { CustomerAddress } from '@prisma/client';

interface CustomerGrpcResponse {
  customerId: string;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  status: string;
  birthDate: string;
}

interface AddressGrpcResponse {
  addressId: string;
  type: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  dddCode: string;
  country: string;
  isDefault: boolean;
}

@Controller()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class CustomerGrpcController {
  constructor(
    private readonly getCustomerQuery: GetCustomerQuery,
    private readonly customerRepo: CustomerRepository,
    private readonly addressRepo: AddressRepository,
  ) {}

  @GrpcMethod('CustomerQueryService', 'GetCustomerById')
  async getCustomerById(data: { customerId: string }): Promise<CustomerGrpcResponse> {
    const customer = await this.getCustomerQuery.byId(data.customerId);
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'GetCustomerByCpf')
  async getCustomerByCpf(data: { cpf: string }): Promise<CustomerGrpcResponse> {
    const customer = await this.getCustomerQuery.byCpf(data.cpf);
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'ValidateCustomerExists')
  async validateCustomerExists(data: { customerId: string }): Promise<{
    exists: boolean;
    isActive: boolean;
    customerId?: string;
    fullName?: string;
  }> {
    const exists = await this.customerRepo.exists(data.customerId);
    if (!exists) {
      return { exists: false, isActive: false };
    }
    const customer = await this.customerRepo.findById(data.customerId);
    return {
      exists: true,
      isActive: customer!.status === 'ACTIVE',
      customerId: customer!.id,
      fullName: customer!.fullName,
    };
  }

  @GrpcMethod('CustomerQueryService', 'GetCustomerAddresses')
  async getCustomerAddresses(data: { customerId: string }): Promise<{ addresses: AddressGrpcResponse[] }> {
    const exists = await this.customerRepo.exists(data.customerId);
    if (!exists) {
      throw new GrpcError(GrpcStatus.NOT_FOUND, `Customer ${data.customerId} not found`);
    }
    const addresses = await this.addressRepo.findByCustomerId(data.customerId);
    return {
      addresses: addresses.map((addr: CustomerAddress) => ({
        addressId: addr.id,
        type: addr.type,
        zipCode: addr.zipCode,
        street: addr.street,
        number: addr.number,
        complement: addr.complement ?? '',
        neighborhood: addr.neighborhood,
        city: addr.city,
        state: addr.state,
        dddCode: addr.dddCode,
        country: addr.country,
        isDefault: addr.isDefault,
      })),
    };
  }

  private mapToResponse(customer: CustomerWithRelations): CustomerGrpcResponse {
    return {
      customerId: customer.id,
      fullName: customer.fullName,
      cpf: customer.cpf,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      birthDate: customer.birthDate.toISOString(),
    };
  }
}
