import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { SubscriptionRecord, SubscriptionWithRelations } from '../../../domain/types';

@Injectable()
export class SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.SubscriptionCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SubscriptionRecord> {
    const client = tx ?? this.prisma;
    return client.subscription.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<SubscriptionRecord | null> {
    const client = tx ?? this.prisma;
    return client.subscription.findUnique({ where: { id } });
  }

  async findByIdWithRelations(id: string): Promise<SubscriptionWithRelations | null> {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: {
        lines: true,
        familyGroup: { include: { members: true } },
      },
    });
  }

  async findByCustomerId(customerId: string): Promise<SubscriptionRecord[]> {
    return this.prisma.subscription.findMany({ where: { customerId } });
  }

  async findActiveByCustomerAndPlanType(
    customerId: string,
    planType: string,
  ): Promise<SubscriptionRecord | null> {
    return this.prisma.subscription.findFirst({
      where: {
        customerId,
        planType: planType as Prisma.EnumPlanTypeFilter,
        status: { notIn: ['CANCELLED'] },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.SubscriptionUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SubscriptionRecord> {
    const client = tx ?? this.prisma;
    return client.subscription.update({ where: { id }, data });
  }
}
