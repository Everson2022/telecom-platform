import { ConflictException } from '@nestjs/common';

export class DuplicateBillingCycleException extends ConflictException {
  constructor(subscriptionId: string, period: string) {
    super(`Billing cycle already exists for subscription ${subscriptionId} in period ${period}`);
  }
}
