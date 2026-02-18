import { Injectable } from '@nestjs/common';
import { Prisma, RecurringBilling } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { RecurringBillingRecord } from '../../../domain/types';
import { RecurringStatus } from '../../../domain/enums';

@Injectable()
export class RecurringBillingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RecurringBillingCreateInput, tx?: PrismaTransactionClient): Promise<RecurringBilling> {
    const client = tx ?? this.prisma;
    return client.recurringBilling.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<RecurringBillingRecord | null> {
    const client = tx ?? this.prisma;
    return client.recurringBilling.findUnique({ where: { id } });
  }

  async findBySubscription(subscriptionId: string): Promise<RecurringBillingRecord | null> {
    return this.prisma.recurringBilling.findUnique({ where: { subscriptionId } });
  }

  async update(id: string, data: Prisma.RecurringBillingUpdateInput, tx?: PrismaTransactionClient): Promise<RecurringBilling> {
    const client = tx ?? this.prisma;
    return client.recurringBilling.update({ where: { id }, data });
  }

  async findDueBillings(referenceDate: Date): Promise<RecurringBillingRecord[]> {
    return this.prisma.recurringBilling.findMany({
      where: {
        status: RecurringStatus.ACTIVE,
        nextBillingDate: { lte: referenceDate },
      },
      orderBy: { nextBillingDate: 'asc' },
    });
  }
}
