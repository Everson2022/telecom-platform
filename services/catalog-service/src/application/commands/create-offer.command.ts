import { Injectable } from '@nestjs/common';
import { PlanNotFoundException, PlanNotActiveException, InvalidPriceException, InvalidOfferDateRangeException } from '../../errors';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
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
    if (plan.status !== 'ACTIVE') {
      throw new PlanNotActiveException('Plan must be ACTIVE to create an offer');
    }

    if (dto.basePriceAmountCents <= 0) {
      throw new InvalidPriceException('Base price must be greater than 0');
    }

    const validFrom = new Date(dto.validFrom);
    if (dto.validUntil) {
      const validUntil = new Date(dto.validUntil);
      if (validFrom >= validUntil) {
        throw new InvalidOfferDateRangeException();
      }
    }

    const offerId = uuidv4();

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.offer.create({
        data: {
          id: offerId,
          planId: dto.planId,
          name: dto.name,
          basePriceAmountCents: dto.basePriceAmountCents,
          basePriceCurrency: dto.basePriceCurrency ?? 'BRL',
          status: 'ACTIVE',
          validFrom,
          validUntil: dto.validUntil ? new Date(dto.validUntil) : null,
        },
      });

      if (dto.eligibilityRules && dto.eligibilityRules.length > 0) {
        for (const rule of dto.eligibilityRules) {
          await tx.eligibilityRule.create({
            data: {
              id: uuidv4(),
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
