import { NotFoundException } from '@nestjs/common';

export class OfferNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Offer ${id} not found`);
  }
}
