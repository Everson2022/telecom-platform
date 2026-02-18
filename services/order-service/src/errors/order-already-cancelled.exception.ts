import { BadRequestException } from '@nestjs/common';

export class OrderAlreadyCancelledException extends BadRequestException {
  constructor() {
    super('Order is already cancelled');
  }
}
