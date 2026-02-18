import { Injectable } from '@nestjs/common';
import { PriceLocalityRepository } from '../../infrastructure/database/repositories/price-locality.repository';
import { PriceLocalityRecord } from '../../domain/types';

@Injectable()
export class ListLocalityPricesQuery {
  constructor(private readonly priceLocalityRepo: PriceLocalityRepository) {}

  async byOfferId(offerId: string): Promise<PriceLocalityRecord[]> {
    return this.priceLocalityRepo.findByOfferId(offerId);
  }
}
