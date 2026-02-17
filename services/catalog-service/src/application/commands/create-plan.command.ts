import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../../infrastructure/database/prisma.service';
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
    // Validar nome unico
    const existingByName = await this.planRepo.findByName(dto.name);
    if (existingByName) {
      throw new ConflictException('Plan name already exists');
    }

    // Validar maxLines conforme type
    const expectedMaxLines = MAX_LINES_BY_TYPE[dto.type];
    if (dto.maxLines !== undefined && dto.maxLines !== expectedMaxLines) {
      throw new BadRequestException(
        `Plan type ${dto.type} must have maxLines = ${expectedMaxLines}`,
      );
    }

    const planId = uuidv4();
    const maxLines = dto.maxLines ?? expectedMaxLines;

    await this.prisma.$transaction(async (tx) => {
      // Criar plano
      await (tx as any).plan.create({
        data: {
          id: planId,
          name: dto.name,
          type: dto.type,
          maxLines,
          status: 'ACTIVE',
          allowedPaymentMethods: dto.allowedPaymentMethods,
        },
      });

      // Criar features
      if (dto.features && dto.features.length > 0) {
        for (const feature of dto.features) {
          await (tx as any).planFeature.create({
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

      // Outbox event
      await this.outboxRepo.create(tx as any, {
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
