import { BadRequestException } from '@nestjs/common';

export class CustomerRequiresAddressException extends BadRequestException {
  constructor() {
    super('At least one address is required');
  }
}
