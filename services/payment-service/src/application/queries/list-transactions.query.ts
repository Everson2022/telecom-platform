import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaymentTransactionRepository } from '../../infrastructure/database/repositories/payment-transaction.repository';
import { TransactionStatus, TransactionType } from '../../domain/enums';
import { PaymentTransactionRecord } from '../../domain/types';

export interface ListTransactionsParams {
  customerId?: string;
  subscriptionId?: string;
  status?: TransactionStatus;
  type?: TransactionType;
  page?: number;
  pageSize?: number;
}

export interface PaginatedTransactions {
  data: PaymentTransactionRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class ListTransactionsQuery {
  constructor(private readonly transactionRepo: PaymentTransactionRepository) {}

  async execute(params: ListTransactionsParams): Promise<PaginatedTransactions> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: Prisma.PaymentTransactionWhereInput = {};
    if (params.customerId) where.customerId = params.customerId;
    if (params.subscriptionId) where.subscriptionId = params.subscriptionId;
    if (params.status) where.status = params.status;
    if (params.type) where.type = params.type;

    const { data, total } = await this.transactionRepo.findMany({ skip, take: pageSize, where });

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
