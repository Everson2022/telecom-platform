import { BadRequestException } from '@nestjs/common';

export class InvalidPriceException extends BadRequestException {
  constructor(message = 'Price must be greater than 0') {
    super(message);
  }
}
