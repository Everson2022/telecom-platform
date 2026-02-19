import { Injectable } from '@nestjs/common';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';
import { ServiceLineRecord } from '../../domain/types';
import { ServiceLineNotFoundException } from '../../errors';

@Injectable()
export class GetServiceLineByMsisdnQuery {
  constructor(private readonly serviceLineRepo: ServiceLineRepository) {}

  async execute(msisdn: string): Promise<ServiceLineRecord> {
    const line = await this.serviceLineRepo.findByMsisdn(msisdn);
    if (!line) {
      throw new ServiceLineNotFoundException(msisdn);
    }
    return line;
  }
}
