import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CustomerWithRelations } from '../../domain/types';

@Injectable()
export class GetCustomerQuery {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async byId(id: string): Promise<CustomerWithRelations> {
    const customer = await this.customerRepo.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  async byCpf(cpf: string): Promise<CustomerWithRelations> {
    const customer = await this.customerRepo.findByCpf(cpf);
    if (!customer) {
      throw new NotFoundException(`Customer with CPF ${cpf} not found`);
    }
    return customer;
  }
}
