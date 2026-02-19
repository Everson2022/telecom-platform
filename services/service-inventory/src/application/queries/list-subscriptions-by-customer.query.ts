import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { SubscriptionRecord } from '../../domain/types';

@Injectable()
export class ListSubscriptionsByCustomerQuery {
  constructor(private readonly subscriptionRepo: SubscriptionRepository) {}

  async execute(customerId: string): Promise<SubscriptionRecord[]> {
    return this.subscriptionRepo.findByCustomerId(customerId);
  }
}
