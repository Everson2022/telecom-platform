import { Injectable } from '@nestjs/common';
import { PlanStatus, PlanType } from '../../domain/enums';
import { PlanRepository } from '../../infrastructure/database/repositories/plan.repository';

export interface ListPlansParams {
  page?: number;
  pageSize?: number;
  status?: PlanStatus;
  type?: PlanType;
  search?: string;
}

@Injectable()
export class ListPlansQuery {
  constructor(private readonly planRepo: PlanRepository) {}

  async execute(params: ListPlansParams) {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: any = {};
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
