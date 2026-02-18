import { ConflictException } from '@nestjs/common';

export class PlanNameConflictException extends ConflictException {
  constructor() {
    super('Plan name already exists');
  }
}
