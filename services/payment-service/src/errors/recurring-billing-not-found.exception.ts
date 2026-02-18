import { NotFoundException } from '@nestjs/common';

export class RecurringBillingNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Recurring billing ${id} not found`);
  }
}
