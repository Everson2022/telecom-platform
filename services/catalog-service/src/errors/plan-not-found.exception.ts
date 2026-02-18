import { NotFoundException } from '@nestjs/common';

export class PlanNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Plan ${id} not found`);
  }

  static byName(name: string): PlanNotFoundException {
    return new PlanNotFoundException(`with name "${name}"`);
  }
}
