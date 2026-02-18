import { Injectable } from '@nestjs/common';
import { OfferNotFoundException, OfferNotActiveException } from '../../errors';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { SetLocalityPriceDto } from '../../presentation/dto/set-locality-price.dto';
import { OfferStatus, PriceLocalityStatus } from '../../domain/enums';

export interface SetLocalityPriceResult {
  offerId: string;
  dddCode: string;
  city: string | null;
  priceAmountCents: number;
}

@Injectable()
export class SetLocalityPriceCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly offerRepo: OfferRepository,
  ) {}

  async execute(offerId: string, dto: SetLocalityPriceDto): Promise<SetLocalityPriceResult> {
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new OfferNotFoundException(offerId);
    }

    if (offer.status !== OfferStatus.ACTIVE) {
      throw new OfferNotActiveException('Only ACTIVE offers can have prices set');
    }

    const city = dto.city ?? null;

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Prisma's compound unique doesn't accept null city, so we do manual upsert
      const existing = await tx.priceLocality.findFirst({
        where: { offerId, dddCode: dto.dddCode, city },
      });

      if (existing) {
        await tx.priceLocality.update({
          where: { id: existing.id },
          data: {
            priceAmountCents: dto.priceAmountCents,
            priceCurrency: dto.priceCurrency ?? 'BRL',
            status: PriceLocalityStatus.ACTIVE,
          },
        });
      } else {
        await tx.priceLocality.create({
          data: {
            id: uuidv4(),
            offerId,
            dddCode: dto.dddCode,
            city,
            priceAmountCents: dto.priceAmountCents,
            priceCurrency: dto.priceCurrency ?? 'BRL',
            status: PriceLocalityStatus.ACTIVE,
          },
        });
      }

      await this.outboxRepo.create(tx, {
        aggregateId: offerId,
        aggregateType: 'Offer',
        eventType: CATALOG_EVENTS.LOCALITY_PRICE_SET,
        payload: {
          offerId,
          dddCode: dto.dddCode,
          city,
          priceAmountCents: dto.priceAmountCents,
          priceCurrency: dto.priceCurrency ?? 'BRL',
        },
      });
    });

    return { offerId, dddCode: dto.dddCode, city, priceAmountCents: dto.priceAmountCents };
  }
}
