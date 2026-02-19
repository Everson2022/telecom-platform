import { Injectable } from '@nestjs/common';
import { BillingCycleRepository } from '../../infrastructure/database/repositories/billing-cycle.repository';
import { BillingCycleRecord } from '../../domain/types';

@Injectable()
export class ListBillingCyclesBySubscriptionQuery {
  constructor(private readonly billingCycleRepo: BillingCycleRepository) {}

  async execute(subscriptionId: string): Promise<BillingCycleRecord[]> {
    return this.billingCycleRepo.findBySubscriptionId(subscriptionId);
  }
}
