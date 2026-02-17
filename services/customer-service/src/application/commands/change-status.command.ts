import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit';
import { CustomerStatus } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { CustomerWithRelations } from '../../domain/types';

const STATUS_TRANSITIONS: Record<CustomerStatus, CustomerStatus[]> = {
  ACTIVE: ['SUSPENDED', 'CANCELLED'],
  SUSPENDED: ['ACTIVE', 'CANCELLED'],
  CANCELLED: [],
};

const STATUS_EVENT_MAP: Record<string, string> = {
  'ACTIVE->SUSPENDED': CUSTOMER_EVENTS.SUSPENDED,
  'SUSPENDED->ACTIVE': CUSTOMER_EVENTS.REACTIVATED,
  'ACTIVE->CANCELLED': CUSTOMER_EVENTS.CANCELLED,
  'SUSPENDED->CANCELLED': CUSTOMER_EVENTS.CANCELLED,
};

@Injectable()
export class ChangeStatusCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(customerId: string, newStatus: CustomerStatus): Promise<CustomerWithRelations> {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    const allowedTransitions = STATUS_TRANSITIONS[customer.status as CustomerStatus];
    if (!allowedTransitions.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${customer.status} to ${newStatus}`,
      );
    }

    const eventType = STATUS_EVENT_MAP[`${customer.status}->${newStatus}`];

    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updated = await tx.customer.update({
        where: { id: customerId },
        data: { status: newStatus },
        include: { documents: true, addresses: true },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType,
        payload: {
          customerId,
          previousStatus: customer.status,
          newStatus,
        },
      });

      return updated;
    });
  }
}
