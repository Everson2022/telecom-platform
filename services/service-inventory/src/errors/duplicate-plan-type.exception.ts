import { ConflictException } from '@nestjs/common';

export class DuplicatePlanTypeException extends ConflictException {
  constructor(customerId: string, planType: string) {
    super(`Customer ${customerId} already has an active ${planType} subscription`);
  }
}
