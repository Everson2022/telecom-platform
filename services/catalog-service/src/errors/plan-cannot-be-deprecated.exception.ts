import { BadRequestException } from '@nestjs/common';

export class PlanCannotBeDeprecatedException extends BadRequestException {
  constructor() {
    super('Only ACTIVE or INACTIVE plans can be deprecated');
  }
}
