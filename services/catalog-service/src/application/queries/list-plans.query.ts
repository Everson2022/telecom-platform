import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PlanStatus, PlanType } from '../../domain/enums';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';
import { PlanWithFeatures } from '../../domain/types';

export interface ListPlansParams {
  page?: number;
  pageSize?: number;
  status?: PlanStatus;
  type?: PlanType;
  search?: string;
}

export interface PaginatedPlans {
  data: PlanWithFeatures[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class ListPlansQuery {
  constructor(private readonly planRepo: PlanRepository) {}

  async execute(params: ListPlansParams): Promise<PaginatedPlans> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: Prisma.PlanWhereInput = {};
    if (params.status) {
      where.status = params.status;
    }
    if (params.type) {
      where.type = params.type;
    }
    if (params.search) {
      where.name = { contains: params.search, mode: 'insensitive' };
    }

    const { data, total } = await this.planRepo.findMany({
      skip,
      take: pageSize,
      where,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
