import { Injectable } from '@nestjs/common';
import { BillingCycleRepository } from '../../infrastructure/database/repositories/billing-cycle.repository';
import { BillingCycleRecord } from '../../domain/types';
import { BillingCycleNotFoundException } from '../../errors';

@Injectable()
export class GetBillingCycleByIdQuery {
  constructor(private readonly billingCycleRepo: BillingCycleRepository) {}

  async execute(id: string): Promise<BillingCycleRecord> {
    const cycle = await this.billingCycleRepo.findById(id);
    if (!cycle) {
      throw new BillingCycleNotFoundException(id);
    }
    return cycle;
  }
}
