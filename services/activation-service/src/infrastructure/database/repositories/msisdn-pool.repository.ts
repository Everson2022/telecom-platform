import { Injectable } from '@nestjs/common';
import { Prisma, MsisdnStatus } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { MsisdnPoolRecord } from '../../../domain/types';

@Injectable()
export class MsisdnPoolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MsisdnPoolCreateInput): Promise<MsisdnPoolRecord> {
    return this.prisma.msisdnPool.create({ data });
  }

  async findFirstAvailable(dddCode: string, tx?: PrismaTransactionClient): Promise<MsisdnPoolRecord | null> {
    const client = tx ?? this.prisma;
    return client.msisdnPool.findFirst({
      where: { dddCode, status: MsisdnStatus.AVAILABLE },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findByMsisdn(msisdn: string, tx?: PrismaTransactionClient): Promise<MsisdnPoolRecord | null> {
    const client = tx ?? this.prisma;
    return client.msisdnPool.findUnique({ where: { msisdn } });
  }

  async update(
    id: string,
    data: Prisma.MsisdnPoolUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<MsisdnPoolRecord> {
    const client = tx ?? this.prisma;
    return client.msisdnPool.update({ where: { id }, data });
  }

  async findMany(params: {
    dddCode?: string;
    status?: MsisdnStatus;
    skip?: number;
    take?: number;
  }): Promise<{ data: MsisdnPoolRecord[]; total: number }> {
    const where: Prisma.MsisdnPoolWhereInput = {};
    if (params.dddCode) where.dddCode = params.dddCode;
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.msisdnPool.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.msisdnPool.count({ where }),
    ]);

    return { data, total };
  }
}
