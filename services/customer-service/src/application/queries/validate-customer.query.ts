import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';

export interface ValidateCustomerResult {
  exists: boolean;
  isActive: boolean;
  customerId?: string;
  fullName?: string;
}

@Injectable()
export class ValidateCustomerQuery {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async execute(customerId: string): Promise<ValidateCustomerResult> {
    const exists = await this.customerRepo.exists(customerId);
    if (!exists) {
      return { exists: false, isActive: false };
    }
    const customer = await this.customerRepo.findById(customerId);
    return {
      exists: true,
      isActive: customer!.status === 'ACTIVE',
      customerId: customer!.id,
      fullName: customer!.fullName,
    };
  }
}
