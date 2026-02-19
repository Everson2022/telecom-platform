import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { PlanType } from '../../domain/enums';

export interface CheckParallelSubscriptionsResult {
  customerId: string;
  planType: PlanType;
  hasActiveSubscription: boolean;
  subscriptionId: string | null;
}

@Injectable()
export class CheckParallelSubscriptionsQuery {
  constructor(private readonly subscriptionRepo: SubscriptionRepository) {}

  async execute(customerId: string, planType: PlanType): Promise<CheckParallelSubscriptionsResult> {
    const existing = await this.subscriptionRepo.findActiveByCustomerAndPlanType(customerId, planType);
    return {
      customerId,
      planType,
      hasActiveSubscription: existing !== null,
      subscriptionId: existing?.id ?? null,
    };
  }
}
