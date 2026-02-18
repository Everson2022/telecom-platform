import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor } from '@telecom/toolkit';
import { GetCustomerQuery } from '../../application/queries/get-customer.query';
import { ValidateCustomerQuery } from '../../application/queries/validate-customer.query';
import { GetCustomerAddressesQuery } from '../../application/queries/get-customer-addresses.query';
import { CustomerWithRelations } from '../../domain/types';
import { CustomerAddress } from '@prisma/client';
import { GetCustomerByIdDto } from './dto/get-customer-by-id.dto';
import { GetCustomerByCpfDto } from './dto/get-customer-by-cpf.dto';
import { ValidateCustomerDto } from './dto/validate-customer.dto';
import { GetCustomerAddressesDto } from './dto/get-customer-addresses.dto';

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
    private readonly validateCustomerQuery: ValidateCustomerQuery,
    private readonly getCustomerAddressesQuery: GetCustomerAddressesQuery,
  ) {}

  @GrpcMethod('CustomerQueryService', 'GetCustomerById')
  async getCustomerById(data: GetCustomerByIdDto): Promise<CustomerGrpcResponse> {
    const customer = await this.getCustomerQuery.byId(data.customerId);
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'GetCustomerByCpf')
  async getCustomerByCpf(data: GetCustomerByCpfDto): Promise<CustomerGrpcResponse> {
    const customer = await this.getCustomerQuery.byCpf(data.cpf);
    return this.mapToResponse(customer);
  }

  @GrpcMethod('CustomerQueryService', 'ValidateCustomerExists')
  async validateCustomerExists(data: ValidateCustomerDto): Promise<{
    exists: boolean;
    isActive: boolean;
    customerId?: string;
    fullName?: string;
  }> {
    return this.validateCustomerQuery.execute(data.customerId);
  }

  @GrpcMethod('CustomerQueryService', 'GetCustomerAddresses')
  async getCustomerAddresses(data: GetCustomerAddressesDto): Promise<{ addresses: AddressGrpcResponse[] }> {
    const addresses = await this.getCustomerAddressesQuery.execute(data.customerId);
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
