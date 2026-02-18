import { BadRequestException } from '@nestjs/common';

export class CustomerRequiresResidentialAddressException extends BadRequestException {
  constructor() {
    super('At least one RESIDENTIAL address is required');
  }
}
