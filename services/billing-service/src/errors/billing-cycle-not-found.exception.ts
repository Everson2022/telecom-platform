import { NotFoundException } from '@nestjs/common';

export class BillingCycleNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Billing cycle not found: ${identifier}`);
  }
}
