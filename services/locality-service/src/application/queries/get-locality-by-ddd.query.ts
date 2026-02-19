import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';

@Injectable()
export class GetLocalityByDddQuery {
  constructor(private readonly localityRepo: LocalityRepository) {}

  async execute(dddCode: string): Promise<LocalityRecord[]> {
    return this.localityRepo.findByDddCode(dddCode);
  }
}
