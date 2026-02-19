import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { LineActivationRecord } from '../../../domain/types';

@Injectable()
export class LineActivationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.LineActivationCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<LineActivationRecord> {
    const client = tx ?? this.prisma;
    return client.lineActivation.create({ data });
  }

  async findByOrderId(orderId: string, tx?: PrismaTransactionClient): Promise<LineActivationRecord | null> {
    const client = tx ?? this.prisma;
    return client.lineActivation.findUnique({ where: { orderId } });
  }

  async findByMsisdn(msisdn: string, tx?: PrismaTransactionClient): Promise<LineActivationRecord | null> {
    const client = tx ?? this.prisma;
    return client.lineActivation.findFirst({ where: { msisdn } });
  }

  async update(
    id: string,
    data: Prisma.LineActivationUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<LineActivationRecord> {
    const client = tx ?? this.prisma;
    return client.lineActivation.update({ where: { id }, data });
  }
}
