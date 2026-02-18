import { Injectable } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { OrderWithItems } from '../../../domain/types';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OrderCreateInput, tx?: PrismaTransactionClient): Promise<Order> {
    const client = tx ?? this.prisma;
    return client.order.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<OrderWithItems | null> {
    const client = tx ?? this.prisma;
    return client.order.findUnique({
      where: { id },
      include: { items: true, sagaExecution: true },
    });
  }

  async update(id: string, data: Prisma.OrderUpdateInput, tx?: PrismaTransactionClient): Promise<Order> {
    const client = tx ?? this.prisma;
    return client.order.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<{ data: OrderWithItems[]; total: number }> {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { items: true, sagaExecution: true },
      }),
      this.prisma.order.count({ where }),
    ]);
    return { data, total };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.order.count({ where: { id } });
    return count > 0;
  }
}
