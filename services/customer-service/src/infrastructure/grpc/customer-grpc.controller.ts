import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor, GrpcError } from '@telecom/toolkit';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { CustomerRepository } from '../database/repositories/customer.repository';
import { AddressRepository } from '../database/repositories/address.repository';

@Controller()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class CustomerGrpcController {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly addressRepo: AddressRepository,
  ) {}

  @GrpcMethod('CustomerQueryService', 'GetCustomerById')
  async getCustomerById(data: { customerId: string }) {
    const customer = await this.customerRepo.findById(data.customerId);
    if (!customer) {
      throw new GrpcError(GrpcStatus.NOT_FOUND, `Customer ${data.customerId} not found`);
    }
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'GetCustomerByCpf')
  async getCustomerByCpf(data: { cpf: string }) {
    const customer = await this.customerRepo.findByCpf(data.cpf);
    if (!customer) {
      throw new GrpcError(GrpcStatus.NOT_FOUND, `Customer with CPF ${data.cpf} not found`);
    }
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'ValidateCustomerExists')
  async validateCustomerExists(data: { customerId: string }) {
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
  async getCustomerAddresses(data: { customerId: string }) {
    const exists = await this.customerRepo.exists(data.customerId);
    if (!exists) {
      throw new GrpcError(GrpcStatus.NOT_FOUND, `Customer ${data.customerId} not found`);
    }
    const addresses = await this.addressRepo.findByCustomerId(data.customerId);
    return {
      addresses: addresses.map((addr) => ({
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

  private mapToResponse(customer: any) {
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
