import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { BillingCycleRecord } from '../../../domain/types';

@Injectable()
export class BillingCycleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.BillingCycleCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<BillingCycleRecord> {
    const client = tx ?? this.prisma;
    return client.billingCycle.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<BillingCycleRecord | null> {
    const client = tx ?? this.prisma;
    return client.billingCycle.findUnique({ where: { id } });
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<BillingCycleRecord | null> {
    return this.prisma.billingCycle.findUnique({ where: { invoiceNumber } });
  }

  async findBySubscriptionId(subscriptionId: string): Promise<BillingCycleRecord[]> {
    return this.prisma.billingCycle.findMany({
      where: { subscriptionId },
      orderBy: { cycleStartDate: 'desc' },
    });
  }

  async findCurrentBySubscription(
    subscriptionId: string,
    cycleStartDate: Date,
  ): Promise<BillingCycleRecord | null> {
    return this.prisma.billingCycle.findFirst({
      where: { subscriptionId, cycleStartDate },
    });
  }

  async update(
    id: string,
    data: Prisma.BillingCycleUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<BillingCycleRecord> {
    const client = tx ?? this.prisma;
    return client.billingCycle.update({ where: { id }, data });
  }
}
