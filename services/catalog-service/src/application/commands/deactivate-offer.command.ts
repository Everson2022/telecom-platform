import { Injectable } from '@nestjs/common';
import { OfferNotFoundException, OfferNotActiveException } from '../../errors';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { OfferWithRelations } from '../../domain/types';
import { OfferStatus } from '../../domain/enums';

@Injectable()
export class DeactivateOfferCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly offerRepo: OfferRepository,
  ) {}

  async execute(id: string): Promise<OfferWithRelations> {
    const offer = await this.offerRepo.findById(id);
    if (!offer) {
      throw new OfferNotFoundException(id);
    }

    if (offer.status !== OfferStatus.ACTIVE) {
      throw new OfferNotActiveException('Only ACTIVE offers can be deactivated');
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.offer.update({
        where: { id },
        data: { status: OfferStatus.INACTIVE },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: id,
        aggregateType: 'Offer',
        eventType: CATALOG_EVENTS.OFFER_DEACTIVATED,
        payload: {
          offerId: id,
          name: offer.name,
        },
      });
    });

    const updated = await this.offerRepo.findById(id);
    if (!updated) {
      throw new OfferNotFoundException(id);
    }
    return updated;
  }
}
