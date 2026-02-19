import { Injectable } from '@nestjs/common';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SimCardNotFoundException } from '../../errors';
import { SimCardRecord } from '../../domain/types';

@Injectable()
export class GetSimByIccidQuery {
  constructor(private readonly simCardRepo: SimCardRepository) {}

  async execute(iccid: string): Promise<SimCardRecord> {
    const sim = await this.simCardRepo.findByIccid(iccid);
    if (!sim) {
      throw new SimCardNotFoundException(iccid);
    }
    return sim;
  }
}
