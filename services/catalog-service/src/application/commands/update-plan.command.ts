import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { UpdatePlanDto } from '../../presentation/dto/update-plan.dto';
import { PlanStatus } from '../../domain/enums';

@Injectable()
export class UpdatePlanCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly planRepo: PlanRepository,
  ) {}

  async execute(id: string, dto: UpdatePlanDto) {
    const plan = await this.planRepo.findById(id);
    if (!plan) {
      throw new NotFoundException(`Plan ${id} not found`);
    }

    if ((plan.status as PlanStatus) !== 'ACTIVE') {
      throw new BadRequestException('Only ACTIVE plans can be updated');
    }

    await this.prisma.$transaction(async (tx) => {
      const updateData: any = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.allowedPaymentMethods !== undefined) {
        updateData.allowedPaymentMethods = dto.allowedPaymentMethods;
      }

      if (Object.keys(updateData).length > 0) {
        await (tx as any).plan.update({ where: { id }, data: updateData });
      }

      // Se features foram fornecidas, substituir todas
      if (dto.features !== undefined) {
        await (tx as any).planFeature.deleteMany({ where: { planId: id } });
        for (const feature of dto.features) {
          await (tx as any).planFeature.create({
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

      await this.outboxRepo.create(tx as any, {
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

    return this.planRepo.findById(id);
  }
}
