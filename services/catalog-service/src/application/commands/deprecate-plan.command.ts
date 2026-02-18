import { Injectable } from '@nestjs/common';
import { PlanNotFoundException, PlanCannotBeDeprecatedException } from '../../errors';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { CATALOG_EVENTS } from '../../domain/events/catalog-events';
import { PlanStatus } from '../../domain/enums';
import { PlanWithFeatures } from '../../domain/types';

@Injectable()
export class DeprecatePlanCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly planRepo: PlanRepository,
  ) {}

  async execute(id: string): Promise<PlanWithFeatures> {
    const plan = await this.planRepo.findById(id);
    if (!plan) {
      throw new PlanNotFoundException(id);
    }

    const status = plan.status as PlanStatus;
    if (status !== PlanStatus.ACTIVE && status !== PlanStatus.INACTIVE) {
      throw new PlanCannotBeDeprecatedException();
    }

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.plan.update({
        where: { id },
        data: { status: PlanStatus.DEPRECATED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: id,
        aggregateType: 'Plan',
        eventType: CATALOG_EVENTS.PLAN_DEPRECATED,
        payload: {
          planId: id,
          name: plan.name,
        },
      });
    });

    const updated = await this.planRepo.findById(id);
    if (!updated) {
      throw new PlanNotFoundException(id);
    }
    return updated;
  }
}
