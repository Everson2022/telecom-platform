import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SIM_EVENTS } from '../../domain/events/sim-events';
import { SimType, SimStatus } from '../../domain/enums';
import { SimCardRecord } from '../../domain/types';

export interface AllocateSimInput {
  orderId: string;
  customerId: string;
  simType: SimType;
  preferredIccid?: string;
}

@Injectable()
export class AllocateSimCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly simCardRepo: SimCardRepository,
  ) {}

  async execute(input: AllocateSimInput): Promise<SimCardRecord | null> {
    // Find an available SIM of requested type
    const availableSim = await this.simCardRepo.findFirstAvailable(input.simType);

    if (!availableSim) {
      await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
        await this.outboxRepo.create(tx, {
          aggregateId: input.orderId,
          aggregateType: 'SimCard',
          eventType: SIM_EVENTS.ALLOCATION_FAILED,
          payload: {
            orderId: input.orderId,
            customerId: input.customerId,
            simType: input.simType,
            reason: 'No SIM card available for the requested type',
          },
        });
      });
      return null;
    }

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updated = await tx.simCard.update({
        where: { id: availableSim.id },
        data: {
          status: SimStatus.ALLOCATED,
          allocatedToOrderId: input.orderId,
          allocatedToCustomerId: input.customerId,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: updated.id,
        aggregateType: 'SimCard',
        eventType: SIM_EVENTS.ALLOCATED,
        payload: {
          simCardId: updated.id,
          iccid: updated.iccid,
          orderId: input.orderId,
          customerId: input.customerId,
          simType: input.simType,
        },
      });

      return updated;
    });

    return result as SimCardRecord;
  }
}
