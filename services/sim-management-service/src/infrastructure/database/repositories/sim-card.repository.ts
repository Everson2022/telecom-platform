import { Injectable } from '@nestjs/common';
import { Prisma, SimCard, SimStatus, SimType } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { SimCardRecord } from '../../../domain/types';

@Injectable()
export class SimCardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SimCardCreateInput, tx?: PrismaTransactionClient): Promise<SimCard> {
    const client = tx ?? this.prisma;
    return client.simCard.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<SimCardRecord | null> {
    const client = tx ?? this.prisma;
    return client.simCard.findUnique({ where: { id } });
  }

  async findByIccid(iccid: string, tx?: PrismaTransactionClient): Promise<SimCardRecord | null> {
    const client = tx ?? this.prisma;
    return client.simCard.findUnique({ where: { iccid } });
  }

  async findFirstAvailable(simType: SimType, tx?: PrismaTransactionClient): Promise<SimCardRecord | null> {
    const client = tx ?? this.prisma;
    return client.simCard.findFirst({
      where: { status: SimStatus.AVAILABLE, type: simType },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findMany(params: {
    status?: SimStatus;
    simType?: SimType;
    skip?: number;
    take?: number;
  }): Promise<{ data: SimCardRecord[]; total: number }> {
    const where: Prisma.SimCardWhereInput = {};
    if (params.status) where.status = params.status;
    if (params.simType) where.type = params.simType;

    const [data, total] = await Promise.all([
      this.prisma.simCard.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.simCard.count({ where }),
    ]);

    return { data, total };
  }

  async update(
    id: string,
    data: Prisma.SimCardUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SimCard> {
    const client = tx ?? this.prisma;
    return client.simCard.update({ where: { id }, data });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.simCard.count({ where: { id } });
    return count > 0;
  }
}
