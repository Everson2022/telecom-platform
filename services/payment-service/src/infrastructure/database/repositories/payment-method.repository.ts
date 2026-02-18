import { Injectable } from '@nestjs/common';
import { Prisma, PaymentMethod } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { PaymentMethodWithRelations, PaymentMethodRecord } from '../../../domain/types';
import { PaymentMethodStatus } from '../../../domain/enums';

@Injectable()
export class PaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PaymentMethodCreateInput, tx?: PrismaTransactionClient): Promise<PaymentMethod> {
    const client = tx ?? this.prisma;
    return client.paymentMethod.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<PaymentMethodRecord | null> {
    const client = tx ?? this.prisma;
    return client.paymentMethod.findUnique({
      where: { id },
      include: { recurringBilling: true },
    });
  }

  async findWithRelations(id: string): Promise<PaymentMethodWithRelations | null> {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
      include: { transactions: true, recurringBilling: true },
    });
  }

  async findBySubscription(subscriptionId: string): Promise<PaymentMethodRecord | null> {
    return this.prisma.paymentMethod.findFirst({
      where: { subscriptionId, status: PaymentMethodStatus.ACTIVE },
      include: { recurringBilling: true },
    });
  }

  async findManyByCustomer(params: {
    customerId: string;
    skip?: number;
    take?: number;
  }): Promise<{ data: PaymentMethodRecord[]; total: number }> {
    const where: Prisma.PaymentMethodWhereInput = { customerId: params.customerId };
    const [data, total] = await Promise.all([
      this.prisma.paymentMethod.findMany({
        where,
        skip: params.skip,
        take: params.take,
        include: { recurringBilling: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.paymentMethod.count({ where }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Prisma.PaymentMethodUpdateInput, tx?: PrismaTransactionClient): Promise<PaymentMethod> {
    const client = tx ?? this.prisma;
    return client.paymentMethod.update({ where: { id }, data });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.paymentMethod.count({ where: { id } });
    return count > 0;
  }
}
