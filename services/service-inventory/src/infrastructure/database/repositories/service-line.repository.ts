import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { ServiceLineRecord } from '../../../domain/types';

@Injectable()
export class ServiceLineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.ServiceLineCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<ServiceLineRecord> {
    const client = tx ?? this.prisma;
    return client.serviceLine.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<ServiceLineRecord | null> {
    const client = tx ?? this.prisma;
    return client.serviceLine.findUnique({ where: { id } });
  }

  async findByMsisdn(msisdn: string, tx?: PrismaTransactionClient): Promise<ServiceLineRecord | null> {
    const client = tx ?? this.prisma;
    return client.serviceLine.findUnique({ where: { msisdn } });
  }

  async findBySubscriptionId(subscriptionId: string): Promise<ServiceLineRecord[]> {
    return this.prisma.serviceLine.findMany({ where: { subscriptionId } });
  }

  async countActiveBySubscriptionId(subscriptionId: string): Promise<number> {
    return this.prisma.serviceLine.count({
      where: { subscriptionId, status: 'ACTIVE' },
    });
  }

  async update(
    id: string,
    data: Prisma.ServiceLineUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<ServiceLineRecord> {
    const client = tx ?? this.prisma;
    return client.serviceLine.update({ where: { id }, data });
  }

  async updateByMsisdn(
    msisdn: string,
    data: Prisma.ServiceLineUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<ServiceLineRecord> {
    const client = tx ?? this.prisma;
    return client.serviceLine.update({ where: { msisdn }, data });
  }

  async updateManyBySubscriptionId(
    subscriptionId: string,
    data: Prisma.ServiceLineUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<Prisma.BatchPayload> {
    const client = tx ?? this.prisma;
    return client.serviceLine.updateMany({ where: { subscriptionId }, data });
  }
}
