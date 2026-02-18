import { Injectable } from '@nestjs/common';
import { OfferNotFoundException } from '../../errors';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';

@Injectable()
export class GetOfferQuery {
  constructor(private readonly offerRepo: OfferRepository) {}

  async byId(id: string) {
    const offer = await this.offerRepo.findById(id);
    if (!offer) {
      throw new OfferNotFoundException(id);
    }
    return offer;
  }
}
