import { Injectable } from '@nestjs/common';
import { SimImportBatchRepository } from '../../infrastructure/database/repositories/sim-import-batch.repository';
import { SimImportBatchNotFoundException } from '../../errors';
import { SimImportBatchWithErrors } from '../../domain/types';

@Injectable()
export class GetSimImportBatchQuery {
  constructor(private readonly simImportBatchRepo: SimImportBatchRepository) {}

  async execute(id: string): Promise<SimImportBatchWithErrors> {
    const batch = await this.simImportBatchRepo.findById(id);
    if (!batch) {
      throw new SimImportBatchNotFoundException(id);
    }
    return batch;
  }
}
