import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';

@Injectable()
export class GetLocalityByCityQuery {
  constructor(private readonly localityRepo: LocalityRepository) {}

  async execute(city: string): Promise<LocalityRecord | null> {
    return this.localityRepo.findByCity(city);
  }
}
