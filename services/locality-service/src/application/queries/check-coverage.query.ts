import { Injectable } from '@nestjs/common';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';

export interface CoverageResult {
  dddCode: string;
  hasCoverage: boolean;
}

@Injectable()
export class CheckCoverageQuery {
  constructor(private readonly localityRepo: LocalityRepository) {}

  async execute(dddCode: string): Promise<CoverageResult> {
    const hasCoverage = await this.localityRepo.hasCoverageByDdd(dddCode);
    return { dddCode, hasCoverage };
  }
}
