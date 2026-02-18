import { BadRequestException } from '@nestjs/common';

export class OfferNotActiveException extends BadRequestException {
  constructor(message = 'Only ACTIVE offers can be modified') {
    super(message);
  }
}
