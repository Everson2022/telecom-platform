import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';

@Injectable()
export class GetPlanQuery {
  constructor(private readonly planRepo: PlanRepository) {}

  async byId(id: string) {
    const plan = await this.planRepo.findById(id);
    if (!plan) {
      throw new NotFoundException(`Plan ${id} not found`);
    }
    return plan;
  }

  async byName(name: string) {
    const plan = await this.planRepo.findByName(name);
    if (!plan) {
      throw new NotFoundException(`Plan with name "${name}" not found`);
    }
    return plan;
  }
}
