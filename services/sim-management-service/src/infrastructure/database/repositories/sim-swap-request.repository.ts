import { Injectable } from '@nestjs/common';
import { Prisma, SimSwapRequest } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { SimSwapRequestRecord } from '../../../domain/types';

@Injectable()
export class SimSwapRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.SimSwapRequestCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SimSwapRequest> {
    const client = tx ?? this.prisma;
    return client.simSwapRequest.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<SimSwapRequestRecord | null> {
    const client = tx ?? this.prisma;
    return client.simSwapRequest.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.SimSwapRequestUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SimSwapRequest> {
    const client = tx ?? this.prisma;
    return client.simSwapRequest.update({ where: { id }, data });
  }
}
