import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SimSwapRequestRepository } from '../../infrastructure/database/repositories/sim-swap-request.repository';
import { SimCardNotFoundException } from '../../errors';
import { SIM_EVENTS } from '../../domain/events/sim-events';
import { SwapType, SwapReason, SimStatus } from '../../domain/enums';
import { SimSwapRequestRecord } from '../../domain/types';
import { BadRequestException } from '@nestjs/common';

export interface RequestSimSwapInput {
  customerId: string;
  msisdn: string;
  oldSimId: string;
  newSimId: string;
  swapType: SwapType;
  reason: SwapReason;
  orderId: string;
}

@Injectable()
export class RequestSimSwapCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly simCardRepo: SimCardRepository,
    private readonly simSwapRequestRepo: SimSwapRequestRepository,
  ) {}

  async execute(input: RequestSimSwapInput): Promise<SimSwapRequestRecord> {
    const oldSim = await this.simCardRepo.findById(input.oldSimId);
    if (!oldSim) {
      throw new SimCardNotFoundException(input.oldSimId);
    }

    const newSim = await this.simCardRepo.findById(input.newSimId);
    if (!newSim) {
      throw new SimCardNotFoundException(input.newSimId);
    }

    if (newSim.status !== SimStatus.AVAILABLE && newSim.status !== SimStatus.RESERVED) {
      throw new BadRequestException(
        `New SIM card ${input.newSimId} is not available for swap (status: ${newSim.status})`,
      );
    }

    const swapRequestId = uuidv7();

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const swapRequest = await tx.simSwapRequest.create({
        data: {
          id: swapRequestId,
          customerId: input.customerId,
          msisdn: input.msisdn,
          oldSimId: input.oldSimId,
          newSimId: input.newSimId,
          swapType: input.swapType,
          reason: input.reason,
          orderId: input.orderId,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: swapRequestId,
        aggregateType: 'SimSwapRequest',
        eventType: SIM_EVENTS.SWAP_REQUESTED,
        payload: {
          swapRequestId,
          customerId: input.customerId,
          msisdn: input.msisdn,
          oldSimId: input.oldSimId,
          newSimId: input.newSimId,
          swapType: input.swapType,
          reason: input.reason,
          orderId: input.orderId,
        },
      });

      return swapRequest;
    });

    return result as SimSwapRequestRecord;
  }
}
