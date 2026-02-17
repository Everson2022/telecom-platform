import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { SetLocalityPriceDto } from '../../presentation/dto/set-locality-price.dto';

@Injectable()
export class SetLocalityPriceCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly offerRepo: OfferRepository,
  ) {}

  async execute(offerId: string, dto: SetLocalityPriceDto) {
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new NotFoundException(`Offer ${offerId} not found`);
    }

    if (offer.status !== 'ACTIVE') {
      throw new BadRequestException('Only ACTIVE offers can have prices set');
    }

    if (dto.priceAmountCents <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }

    const priceLocalityId = uuidv4();
    const city = dto.city ?? null;

    await this.prisma.$transaction(async (tx) => {
      // Upsert: cria ou atualiza preco por localidade
      await (tx as any).priceLocality.upsert({
        where: {
          offerId_dddCode_city: {
            offerId,
            dddCode: dto.dddCode,
            city,
          },
        },
        create: {
          id: priceLocalityId,
          offerId,
          dddCode: dto.dddCode,
          city,
          priceAmountCents: dto.priceAmountCents,
          priceCurrency: dto.priceCurrency ?? 'BRL',
          status: 'ACTIVE',
        },
        update: {
          priceAmountCents: dto.priceAmountCents,
          priceCurrency: dto.priceCurrency ?? 'BRL',
          status: 'ACTIVE',
        },
      });

      await this.outboxRepo.create(tx as any, {
        aggregateId: offerId,
        aggregateType: 'Offer',
        eventType: CATALOG_EVENTS.LOCALITY_PRICE_SET,
        payload: {
          priceLocalityId,
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
