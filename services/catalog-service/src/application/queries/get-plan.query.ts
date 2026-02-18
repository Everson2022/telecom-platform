import { Injectable } from '@nestjs/common';
import { PlanNotFoundException } from '../../errors';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';

@Injectable()
export class GetPlanQuery {
  constructor(private readonly planRepo: PlanRepository) {}

  async byId(id: string) {
    const plan = await this.planRepo.findById(id);
    if (!plan) {
      throw new PlanNotFoundException(id);
    }
    return plan;
  }

  async byName(name: string) {
    const plan = await this.planRepo.findByName(name);
    if (!plan) {
      throw PlanNotFoundException.byName(name);
    }
    return plan;
  }
}
