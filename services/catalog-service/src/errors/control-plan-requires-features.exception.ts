import { BadRequestException } from '@nestjs/common';

export class ControlPlanRequiresFeaturesException extends BadRequestException {
  constructor() {
    super('At least one feature is required for a CONTROL plan');
  }
}
