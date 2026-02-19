import { Injectable } from '@nestjs/common';
import { PlanNotFoundException, PlanNotActiveException } from '../../errors';
import { Prisma } from '@prisma/client';
import { PlanStatus, OfferStatus } from '../../domain/enums';
import { v7 as uuidv7 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { CreateOfferDto } from '../../presentation/dto/create-offer.dto';

@Injectable()
export class CreateOfferCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly planRepo: PlanRepository,
  ) {}

  async execute(dto: CreateOfferDto): Promise<string> {
    const plan = await this.planRepo.findById(dto.planId);
    if (!plan) {
      throw new PlanNotFoundException(dto.planId);
    }
    if (plan.status !== PlanStatus.ACTIVE) {
      throw new PlanNotActiveException('Plan must be ACTIVE to create an offer');
    }

    const validFrom = new Date(dto.validFrom);

    const offerId = uuidv7();

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.offer.create({
        data: {
          id: offerId,
          planId: dto.planId,
          name: dto.name,
          basePriceAmountCents: dto.basePriceAmountCents,
          basePriceCurrency: dto.basePriceCurrency ?? 'BRL',
          status: OfferStatus.ACTIVE,
          validFrom,
          validUntil: dto.validUntil ? new Date(dto.validUntil) : null,
        },
      });

      if (dto.eligibilityRules && dto.eligibilityRules.length > 0) {
        for (const rule of dto.eligibilityRules) {
          await tx.eligibilityRule.create({
            data: {
              id: uuidv7(),
              offerId,
              ruleType: rule.ruleType,
              ruleValue: rule.ruleValue as Prisma.InputJsonValue,
            },
          });
        }
      }

      await this.outboxRepo.create(tx, {
        aggregateId: offerId,
        aggregateType: 'Offer',
        eventType: CATALOG_EVENTS.OFFER_CREATED,
        payload: {
          offerId,
          planId: dto.planId,
          name: dto.name,
          basePriceAmountCents: dto.basePriceAmountCents,
          basePriceCurrency: dto.basePriceCurrency ?? 'BRL',
          validFrom: validFrom.toISOString(),
          validUntil: dto.validUntil ?? null,
        },
      });
    });

    return offerId;
  }
}
