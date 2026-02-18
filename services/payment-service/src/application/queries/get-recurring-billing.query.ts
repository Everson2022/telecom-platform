import { Injectable } from '@nestjs/common';
import { RecurringBillingRepository } from '../../infrastructure/database/repositories/recurring-billing.repository';
import { RecurringBillingNotFoundException } from '../../errors/recurring-billing-not-found.exception';
import { RecurringBillingRecord } from '../../domain/types';

@Injectable()
export class GetRecurringBillingQuery {
  constructor(private readonly recurringBillingRepo: RecurringBillingRepository) {}

  async byId(id: string): Promise<RecurringBillingRecord> {
    const billing = await this.recurringBillingRepo.findById(id);
    if (!billing) {
      throw new RecurringBillingNotFoundException(id);
    }
    return billing;
  }

  async bySubscription(subscriptionId: string): Promise<RecurringBillingRecord> {
    const billing = await this.recurringBillingRepo.findBySubscription(subscriptionId);
    if (!billing) {
      throw new RecurringBillingNotFoundException(subscriptionId);
    }
    return billing;
  }
}
