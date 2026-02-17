import { Injectable } from '@nestjs/common';
import { CustomerStatus } from '@prisma/client';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';

export interface ListCustomersParams {
  page?: number;
  pageSize?: number;
  status?: CustomerStatus;
  search?: string;
}

@Injectable()
export class ListCustomersQuery {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async execute(params: ListCustomersParams) {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (params.status) {
      where.status = params.status;
    }
    if (params.search) {
      where.OR = [
        { fullName: { contains: params.search, mode: 'insensitive' } },
        { cpf: { contains: params.search } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const { data, total } = await this.customerRepo.findMany({
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
