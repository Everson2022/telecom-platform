import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { SubscriptionWithRelations } from '../../domain/types';
import { SubscriptionNotFoundException } from '../../errors';

@Injectable()
export class GetSubscriptionByIdQuery {
  constructor(private readonly subscriptionRepo: SubscriptionRepository) {}

  async execute(subscriptionId: string): Promise<SubscriptionWithRelations> {
    const subscription = await this.subscriptionRepo.findByIdWithRelations(subscriptionId);
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }
    return subscription;
  }
}
