import { Injectable } from '@nestjs/common';
import { LineActivationRepository } from '../../infrastructure/database/repositories/line-activation.repository';
import { LineActivationRecord } from '../../domain/types';
import { LineActivationNotFoundException } from '../../errors';

@Injectable()
export class GetActivationByOrderIdQuery {
  constructor(private readonly lineActivationRepo: LineActivationRepository) {}

  async execute(orderId: string): Promise<LineActivationRecord> {
    const activation = await this.lineActivationRepo.findByOrderId(orderId);
    if (!activation) {
      throw new LineActivationNotFoundException(orderId);
    }
    return activation;
  }
}
