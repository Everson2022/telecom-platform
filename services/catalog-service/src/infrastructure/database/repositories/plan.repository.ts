import { Injectable } from '@nestjs/common';
import { Prisma, Plan } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PlanCreateInput, tx?: any): Promise<Plan> {
    const client = tx ?? this.prisma;
    return client.plan.create({ data });
  }

  async findById(id: string, tx?: any) {
    const client = tx ?? this.prisma;
    return client.plan.findUnique({
      where: { id },
      include: { features: true },
    });
  }

  async findByName(name: string) {
    return this.prisma.plan.findUnique({
      where: { name },
      include: { features: true },
    });
  }

  async update(id: string, data: Prisma.PlanUpdateInput, tx?: any): Promise<Plan> {
    const client = tx ?? this.prisma;
    return client.plan.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput;
  }) {
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
