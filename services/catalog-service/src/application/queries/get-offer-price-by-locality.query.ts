import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { PriceLocalityRepository } from '../../infrastructure/database/repositories/price-locality.repository';

@Injectable()
export class GetOfferPriceByLocalityQuery {
  constructor(
    private readonly offerRepo: OfferRepository,
    private readonly priceLocalityRepo: PriceLocalityRepository,
  ) {}

  async execute(offerId: string, dddCode: string, city?: string) {
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new NotFoundException(`Offer ${offerId} not found`);
    }

    // Tentar buscar preco especifico por cidade
    if (city) {
      const cityPrice = await this.priceLocalityRepo.findByLocality(offerId, dddCode, city);
      if (cityPrice) return cityPrice;
    }

    // Fallback: preco por DDD (sem cidade)
    const dddPrice = await this.priceLocalityRepo.findByLocality(offerId, dddCode);
    if (dddPrice) return dddPrice;

    // Fallback: preco base da oferta
    return {
      offerId: offer.id,
      dddCode,
      city: city ?? null,
      priceAmountCents: offer.basePriceAmountCents,
      priceCurrency: offer.basePriceCurrency,
      isBasePrice: true,
    };
  }
}
