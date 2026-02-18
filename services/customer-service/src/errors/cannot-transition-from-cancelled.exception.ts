import { BadRequestException } from '@nestjs/common';

export class CannotTransitionFromCancelledException extends BadRequestException {
  constructor() {
    super('Cannot transition from CANCELLED status');
  }
}
