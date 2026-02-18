import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { UpdatePlanDto } from '../../presentation/dto/update-plan.dto';
import { PlanStatus } from '../../domain/enums';
import { PlanWithFeatures } from '../../domain/types';

@Injectable()
export class UpdatePlanCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly planRepo: PlanRepository,
  ) {}

  async execute(id: string, dto: UpdatePlanDto): Promise<PlanWithFeatures> {
    const plan = await this.planRepo.findById(id);
    if (!plan) {
      throw new NotFoundException(`Plan ${id} not found`);
    }

    if ((plan.status as PlanStatus) !== 'ACTIVE') {
      throw new BadRequestException('Only ACTIVE plans can be updated');
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updateData: Prisma.PlanUpdateInput = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.allowedPaymentMethods !== undefined) {
        updateData.allowedPaymentMethods = dto.allowedPaymentMethods;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.plan.update({ where: { id }, data: updateData });
      }

      if (dto.features !== undefined) {
        await tx.planFeature.deleteMany({ where: { planId: id } });
        for (const feature of dto.features) {
          await tx.planFeature.create({
            data: {
              id: uuidv4(),
              planId: id,
              name: feature.name,
              quota: feature.quota,
              unit: feature.unit,
              unlimited: feature.unlimited ?? false,
            },
          });
        }
      }

      await this.outboxRepo.create(tx, {
        aggregateId: id,
        aggregateType: 'Plan',
        eventType: CATALOG_EVENTS.PLAN_UPDATED,
        payload: {
          planId: id,
          name: dto.name ?? plan.name,
          type: plan.type,
        },
      });
    });

    const updated = await this.planRepo.findById(id);
    if (!updated) {
      throw new NotFoundException(`Plan ${id} not found after update`);
    }
    return updated;
  }
}
