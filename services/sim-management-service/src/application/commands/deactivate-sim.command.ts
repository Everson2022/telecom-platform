import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SimCardNotFoundException } from '../../errors';
import { SIM_EVENTS } from '../../domain/events/sim-events';
import { SimStatus } from '../../domain/enums';
import { SimCardRecord } from '../../domain/types';

@Injectable()
export class DeactivateSimCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly simCardRepo: SimCardRepository,
  ) {}

  async execute(simCardId: string): Promise<SimCardRecord> {
    const sim = await this.simCardRepo.findById(simCardId);
    if (!sim) {
      throw new SimCardNotFoundException(simCardId);
    }

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updated = await tx.simCard.update({
        where: { id: simCardId },
        data: { status: SimStatus.DEACTIVATED },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: updated.id,
        aggregateType: 'SimCard',
        eventType: SIM_EVENTS.DEACTIVATED,
        payload: {
          simCardId: updated.id,
          iccid: updated.iccid,
        },
      });

      return updated;
    });

    return result as SimCardRecord;
  }
}
