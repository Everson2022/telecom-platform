import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../../infrastructure/database/prisma.service';
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
    // Validar plano existe e esta ativo
    const plan = await this.planRepo.findById(dto.planId);
    if (!plan) {
      throw new NotFoundException(`Plan ${dto.planId} not found`);
    }
    if (plan.status !== 'ACTIVE') {
      throw new BadRequestException('Plan must be ACTIVE to create an offer');
    }

    // Validar preco
    if (dto.basePriceAmountCents <= 0) {
      throw new BadRequestException('Base price must be greater than 0');
    }

    // Validar datas
    const validFrom = new Date(dto.validFrom);
    if (dto.validUntil) {
      const validUntil = new Date(dto.validUntil);
      if (validFrom >= validUntil) {
        throw new BadRequestException('validFrom must be before validUntil');
      }
    }

    const offerId = uuidv4();

    await this.prisma.$transaction(async (tx) => {
      await (tx as any).offer.create({
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

      // Criar regras de elegibilidade
      if (dto.eligibilityRules && dto.eligibilityRules.length > 0) {
        for (const rule of dto.eligibilityRules) {
          await (tx as any).eligibilityRule.create({
            data: {
              id: uuidv4(),
              offerId,
              ruleType: rule.ruleType,
              ruleValue: rule.ruleValue,
            },
          });
        }
      }

      await this.outboxRepo.create(tx as any, {
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
