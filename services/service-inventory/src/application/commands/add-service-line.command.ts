import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { LineStatus, LineRole } from '../../domain/enums';
import { SubscriptionNotFoundException } from '../../errors';
import { ServiceLineRecord } from '../../domain/types';

export interface AddServiceLineInput {
  subscriptionId: string;
  customerId: string;
  msisdn: string;
  iccid: string;
  simType: string;
  role?: LineRole;
}

@Injectable()
export class AddServiceLineCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly serviceLineRepo: ServiceLineRepository,
  ) {}

  async execute(input: AddServiceLineInput): Promise<ServiceLineRecord> {
    const subscription = await this.subscriptionRepo.findById(input.subscriptionId);
    if (!subscription) {
      throw new SubscriptionNotFoundException(input.subscriptionId);
    }

    const line = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const created = await tx.serviceLine.create({
        data: {
          subscriptionId: input.subscriptionId,
          customerId: input.customerId,
          msisdn: input.msisdn,
          iccid: input.iccid,
          simType: input.simType,
          role: input.role ?? LineRole.MEMBER,
          status: LineStatus.PENDING_ACTIVATION,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: created.id,
        aggregateType: 'ServiceLine',
        eventType: SERVICE_INVENTORY_EVENTS.LINE_ADDED,
        payload: {
          lineId: created.id,
          subscriptionId: input.subscriptionId,
          customerId: input.customerId,
          msisdn: input.msisdn,
          iccid: input.iccid,
          simType: input.simType,
          role: input.role ?? LineRole.MEMBER,
        },
      });

      return created;
    });

    return line;
  }
}
