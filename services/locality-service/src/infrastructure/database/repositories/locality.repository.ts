import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { LocalityRecord } from '../../../domain/types';

@Injectable()
export class LocalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: PrismaTransactionClient): Promise<LocalityRecord | null> {
    const client = tx ?? this.prisma;
    return client.locality.findUnique({ where: { id } });
  }

  async findByIbgeCode(ibgeCode: string, tx?: PrismaTransactionClient): Promise<LocalityRecord | null> {
    const client = tx ?? this.prisma;
    return client.locality.findUnique({ where: { ibgeCode } });
  }

  async findByDddCode(dddCode: string): Promise<LocalityRecord[]> {
    return this.prisma.locality.findMany({
      where: { dddCode, status: 'ACTIVE' },
      orderBy: { city: 'asc' },
    });
  }

  async findByCity(city: string): Promise<LocalityRecord | null> {
    return this.prisma.locality.findFirst({
      where: { city: { contains: city, mode: 'insensitive' }, status: 'ACTIVE' },
    });
  }

  async findByState(state: string): Promise<LocalityRecord[]> {
    return this.prisma.locality.findMany({
      where: { state, status: 'ACTIVE' },
      orderBy: { city: 'asc' },
    });
  }

  async hasCoverageByDdd(dddCode: string): Promise<boolean> {
    const count = await this.prisma.locality.count({
      where: { dddCode, hasCoverage: true, status: 'ACTIVE' },
    });
    return count > 0;
  }

  async create(
    data: Prisma.LocalityUncheckedCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<LocalityRecord> {
    const client = tx ?? this.prisma;
    return client.locality.create({ data });
  }

  async update(
    id: string,
    data: Prisma.LocalityUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<LocalityRecord> {
    const client = tx ?? this.prisma;
    return client.locality.update({ where: { id }, data });
  }
}
