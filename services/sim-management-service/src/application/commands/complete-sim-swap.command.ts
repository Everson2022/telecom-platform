import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SimSwapRequestRepository } from '../../infrastructure/database/repositories/sim-swap-request.repository';
import { SimSwapRequestNotFoundException } from '../../errors';
import { SIM_EVENTS } from '../../domain/events/sim-events';
import { SimStatus, SwapStatus } from '../../domain/enums';
import { SimSwapRequestRecord } from '../../domain/types';

@Injectable()
export class CompleteSimSwapCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly simSwapRequestRepo: SimSwapRequestRepository,
  ) {}

  async execute(swapRequestId: string): Promise<SimSwapRequestRecord> {
    const swapRequest = await this.simSwapRequestRepo.findById(swapRequestId);
    if (!swapRequest) {
      throw new SimSwapRequestNotFoundException(swapRequestId);
    }

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Deactivate old SIM
      await tx.simCard.update({
        where: { id: swapRequest.oldSimId },
        data: { status: SimStatus.DEACTIVATED },
      });

      // Activate new SIM
      await tx.simCard.update({
        where: { id: swapRequest.newSimId },
        data: { status: SimStatus.ACTIVATED },
      });

      // Mark swap as completed
      const updatedSwap = await tx.simSwapRequest.update({
        where: { id: swapRequestId },
        data: { status: SwapStatus.COMPLETED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: swapRequestId,
        aggregateType: 'SimSwapRequest',
        eventType: SIM_EVENTS.SWAP_COMPLETED,
        payload: {
          swapRequestId,
          customerId: swapRequest.customerId,
          msisdn: swapRequest.msisdn,
          oldSimId: swapRequest.oldSimId,
          newSimId: swapRequest.newSimId,
        },
      });

      return updatedSwap;
    });

    return result as SimSwapRequestRecord;
  }
}
