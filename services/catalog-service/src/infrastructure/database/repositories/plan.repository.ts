import { Injectable } from '@nestjs/common';
import { Prisma, Plan } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { PlanWithFeatures } from '../../../domain/types';

@Injectable()
export class PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PlanCreateInput, tx?: PrismaTransactionClient): Promise<Plan> {
    const client = tx ?? this.prisma;
    return client.plan.create({ data });
  }

  async findById(id: string, tx?: PrismaTransactionClient): Promise<PlanWithFeatures | null> {
    const client = tx ?? this.prisma;
    return client.plan.findUnique({
      where: { id },
      include: { features: true },
    });
  }

  async findByName(name: string): Promise<PlanWithFeatures | null> {
    return this.prisma.plan.findUnique({
      where: { name },
      include: { features: true },
    });
  }

  async update(id: string, data: Prisma.PlanUpdateInput, tx?: PrismaTransactionClient): Promise<Plan> {
    const client = tx ?? this.prisma;
    return client.plan.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput;
  }): Promise<{ data: PlanWithFeatures[]; total: number }> {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      this.prisma.plan.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { features: true },
      }),
      this.prisma.plan.count({ where }),
    ]);
    return { data, total };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.plan.count({ where: { id } });
    return count > 0;
  }
}
