import { Injectable } from '@nestjs/common';
import { SimSwapRequestRepository } from '../../infrastructure/database/repositories/sim-swap-request.repository';
import { SimSwapRequestNotFoundException } from '../../errors';
import { SimSwapRequestRecord } from '../../domain/types';

@Injectable()
export class GetSimSwapRequestQuery {
  constructor(private readonly simSwapRequestRepo: SimSwapRequestRepository) {}

  async execute(id: string): Promise<SimSwapRequestRecord> {
    const swapRequest = await this.simSwapRequestRepo.findById(id);
    if (!swapRequest) {
      throw new SimSwapRequestNotFoundException(id);
    }
    return swapRequest;
  }
}
