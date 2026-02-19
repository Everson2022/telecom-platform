import { Injectable } from '@nestjs/common';
import { Prisma, SimImportBatch } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { SimImportBatchWithErrors } from '../../../domain/types';

@Injectable()
export class SimImportBatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.SimImportBatchCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SimImportBatch> {
    const client = tx ?? this.prisma;
    return client.simImportBatch.create({ data });
  }

  async findById(id: string): Promise<SimImportBatchWithErrors | null> {
    return this.prisma.simImportBatch.findUnique({
      where: { id },
      include: { errors: true },
    });
  }

  async update(
    id: string,
    data: Prisma.SimImportBatchUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<SimImportBatch> {
    const client = tx ?? this.prisma;
    return client.simImportBatch.update({ where: { id }, data });
  }
}
