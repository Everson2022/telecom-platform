import { Injectable } from '@nestjs/common';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';

export interface CountActiveLinesResult {
  subscriptionId: string;
  count: number;
}

@Injectable()
export class CountActiveLinesQuery {
  constructor(private readonly serviceLineRepo: ServiceLineRepository) {}

  async execute(subscriptionId: string): Promise<CountActiveLinesResult> {
    const count = await this.serviceLineRepo.countActiveBySubscriptionId(subscriptionId);
    return { subscriptionId, count };
  }
}
