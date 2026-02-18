import { Injectable } from '@nestjs/common';
import { PlanNameConflictException, InvalidMaxLinesException } from '../../errors';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { CreatePlanDto } from '../../presentation/dto/create-plan.dto';
import { PlanType } from '../../domain/enums';

const MAX_LINES_BY_TYPE: Record<string, number> = {
  CONTROL: 5,
  PREPAID: 1,
  POSTPAID: 1,
};

@Injectable()
export class CreatePlanCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly planRepo: PlanRepository,
  ) {}

  async execute(dto: CreatePlanDto): Promise<string> {
    const existingByName = await this.planRepo.findByName(dto.name);
    if (existingByName) {
      throw new PlanNameConflictException();
    }

    const expectedMaxLines = MAX_LINES_BY_TYPE[dto.type as PlanType];
    if (dto.maxLines !== undefined && dto.maxLines !== expectedMaxLines) {
      throw new InvalidMaxLinesException(dto.type, expectedMaxLines);
    }

    const planId = uuidv4();
    const maxLines = dto.maxLines ?? expectedMaxLines;

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.plan.create({
        data: {
          id: planId,
          name: dto.name,
          type: dto.type,
          maxLines,
          status: 'ACTIVE',
          allowedPaymentMethods: dto.allowedPaymentMethods,
        },
      });

      if (dto.features && dto.features.length > 0) {
        for (const feature of dto.features) {
          await tx.planFeature.create({
            data: {
              id: uuidv4(),
              planId,
              name: feature.name,
              quota: feature.quota,
              unit: feature.unit,
              unlimited: feature.unlimited ?? false,
            },
          });
        }
      }

      await this.outboxRepo.create(tx, {
        aggregateId: planId,
        aggregateType: 'Plan',
        eventType: CATALOG_EVENTS.PLAN_CREATED,
        payload: {
          planId,
          name: dto.name,
          type: dto.type,
          maxLines,
          allowedPaymentMethods: dto.allowedPaymentMethods,
        },
      });
    });

    return planId;
  }
}
