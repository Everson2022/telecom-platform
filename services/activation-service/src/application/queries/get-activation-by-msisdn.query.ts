import { Injectable } from '@nestjs/common';
import { LineActivationRepository } from '../../infrastructure/database/repositories/line-activation.repository';
import { LineActivationRecord } from '../../domain/types';
import { LineActivationNotFoundException } from '../../errors';

@Injectable()
export class GetActivationByMsisdnQuery {
  constructor(private readonly lineActivationRepo: LineActivationRepository) {}

  async execute(msisdn: string): Promise<LineActivationRecord> {
    const activation = await this.lineActivationRepo.findByMsisdn(msisdn);
    if (!activation) {
      throw new LineActivationNotFoundException(msisdn);
    }
    return activation;
  }
}
