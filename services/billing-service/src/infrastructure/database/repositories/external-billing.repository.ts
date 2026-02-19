import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { ExternalBillingReferenceRecord } from '../../../domain/types';

@Injectable()
export class ExternalBillingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.ExternalBillingReferenceCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<ExternalBillingReferenceRecord> {
    const client = tx ?? this.prisma;
    return client.externalBillingReference.create({ data });
  }

  async findBySubscriptionId(subscriptionId: string): Promise<ExternalBillingReferenceRecord | null> {
    return this.prisma.externalBillingReference.findUnique({ where: { subscriptionId } });
  }

  async update(
    id: string,
    data: Prisma.ExternalBillingReferenceUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<ExternalBillingReferenceRecord> {
    const client = tx ?? this.prisma;
    return client.externalBillingReference.update({ where: { id }, data });
  }
}
