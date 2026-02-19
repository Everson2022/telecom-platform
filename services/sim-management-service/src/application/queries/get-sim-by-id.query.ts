import { Injectable } from '@nestjs/common';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SimCardNotFoundException } from '../../errors';
import { SimCardRecord } from '../../domain/types';

@Injectable()
export class GetSimByIdQuery {
  constructor(private readonly simCardRepo: SimCardRepository) {}

  async execute(id: string): Promise<SimCardRecord> {
    const sim = await this.simCardRepo.findById(id);
    if (!sim) {
      throw new SimCardNotFoundException(id);
    }
    return sim;
  }
}
