import { BadRequestException } from '@nestjs/common';

export class InvalidOfferDateRangeException extends BadRequestException {
  constructor() {
    super('validFrom must be before validUntil');
  }
}
