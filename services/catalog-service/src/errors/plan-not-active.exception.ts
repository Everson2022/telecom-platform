import { BadRequestException } from '@nestjs/common';

export class PlanNotActiveException extends BadRequestException {
  constructor(message = 'Plan must be ACTIVE') {
    super(message);
  }
}
