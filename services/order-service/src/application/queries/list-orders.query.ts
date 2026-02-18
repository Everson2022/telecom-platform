import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderStatus, OrderType } from '../../domain/enums';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { OrderWithItems } from '../../domain/types';

export interface ListOrdersParams {
  page?: number;
  pageSize?: number;
  customerId?: string;
  status?: OrderStatus;
  type?: OrderType;
}

export interface PaginatedOrders {
  data: OrderWithItems[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class ListOrdersQuery {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(params: ListOrdersParams): Promise<PaginatedOrders> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: Prisma.OrderWhereInput = {};
    if (params.customerId) {
      where.customerId = params.customerId;
    }
    if (params.status) {
      where.status = params.status;
    }
    if (params.type) {
      where.type = params.type;
    }

    const { data, total } = await this.orderRepo.findMany({
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
