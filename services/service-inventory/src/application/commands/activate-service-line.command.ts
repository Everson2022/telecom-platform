import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { LineStatus } from '../../domain/enums';
import { ServiceLineNotFoundException } from '../../errors';
import { ServiceLineRecord } from '../../domain/types';

@Injectable()
export class ActivateServiceLineCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceLineRepo: ServiceLineRepository,
  ) {}

  async execute(msisdn: string): Promise<ServiceLineRecord> {
    const line = await this.serviceLineRepo.findByMsisdn(msisdn);
    if (!line) {
      throw new ServiceLineNotFoundException(msisdn);
    }

    const updated = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const result = await tx.serviceLine.update({
        where: { msisdn },
        data: { status: LineStatus.ACTIVE },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: result.id,
        aggregateType: 'ServiceLine',
        eventType: SERVICE_INVENTORY_EVENTS.LINE_ACTIVATED,
        payload: {
          lineId: result.id,
          subscriptionId: result.subscriptionId,
          customerId: result.customerId,
          msisdn: result.msisdn,
          iccid: result.iccid,
          role: result.role,
        },
      });

      return result;
    });

    return updated;
  }
}
