import { Injectable } from '@nestjs/common';
import { Prisma, PaymentTransaction } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { PaymentTransactionRecord } from '../../../domain/types';
import { TransactionStatus } from '../../../domain/enums';

@Injectable()
export class PaymentTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PaymentTransactionCreateInput, tx?: PrismaTransactionClient): Promise<PaymentTransaction> {
    const client = tx ?? this.prisma;
    return client.paymentTransaction.create({ data });
  }

  async findById(id: string): Promise<PaymentTransactionRecord | null> {
    return this.prisma.paymentTransaction.findUnique({ where: { id } });
  }

  async findByIdempotencyKey(key: string): Promise<PaymentTransactionRecord | null> {
    return this.prisma.paymentTransaction.findUnique({ where: { idempotencyKey: key } });
  }

  async update(id: string, data: Prisma.PaymentTransactionUpdateInput, tx?: PrismaTransactionClient): Promise<PaymentTransaction> {
    const client = tx ?? this.prisma;
    return client.paymentTransaction.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PaymentTransactionWhereInput;
  }): Promise<{ data: PaymentTransactionRecord[]; total: number }> {
    const [data, total] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where: params.where,
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.paymentTransaction.count({ where: params.where }),
    ]);
    return { data, total };
  }

  async isProcessed(idempotencyKey: string): Promise<boolean> {
    const count = await this.prisma.paymentTransaction.count({ where: { idempotencyKey } });
    return count > 0;
  }

  async findApprovedBySubscription(subscriptionId: string): Promise<PaymentTransactionRecord[]> {
    return this.prisma.paymentTransaction.findMany({
      where: { subscriptionId, status: TransactionStatus.APPROVED },
      orderBy: { createdAt: 'desc' },
    });
  }
}
