import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';

@Injectable()
export class DeactivateOfferCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly offerRepo: OfferRepository,
  ) {}

  async execute(id: string) {
    const offer = await this.offerRepo.findById(id);
    if (!offer) {
      throw new NotFoundException(`Offer ${id} not found`);
    }

    if (offer.status !== 'ACTIVE') {
      throw new BadRequestException('Only ACTIVE offers can be deactivated');
    }

    await this.prisma.$transaction(async (tx) => {
      await (tx as any).offer.update({
        where: { id },
        data: { status: 'INACTIVE' },
      });

      await this.outboxRepo.create(tx as any, {
        aggregateId: id,
        aggregateType: 'Offer',
        eventType: CATALOG_EVENTS.OFFER_DEACTIVATED,
        payload: {
          offerId: id,
          name: offer.name,
        },
      });
    });

    return this.offerRepo.findById(id);
  }
}
