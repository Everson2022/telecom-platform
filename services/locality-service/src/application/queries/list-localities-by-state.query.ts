import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';

@Injectable()
export class ListLocalitiesByStateQuery {
  constructor(private readonly localityRepo: LocalityRepository) {}

  async execute(state: string): Promise<LocalityRecord[]> {
    return this.localityRepo.findByState(state);
  }
}
