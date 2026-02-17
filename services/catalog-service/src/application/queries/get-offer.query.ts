import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';

@Injectable()
export class GetOfferQuery {
  constructor(private readonly offerRepo: OfferRepository) {}

  async byId(id: string) {
    const offer = await this.offerRepo.findById(id);
    if (!offer) {
      throw new NotFoundException(`Offer ${id} not found`);
    }
    return offer;
  }
}
