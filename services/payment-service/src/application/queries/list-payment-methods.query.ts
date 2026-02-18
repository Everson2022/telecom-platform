import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { PaymentMethodRecord } from '../../domain/types';

export interface ListPaymentMethodsParams {
  customerId: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedPaymentMethods {
  data: PaymentMethodRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class ListPaymentMethodsQuery {
  constructor(private readonly paymentMethodRepo: PaymentMethodRepository) {}

  async execute(params: ListPaymentMethodsParams): Promise<PaginatedPaymentMethods> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const { data, total } = await this.paymentMethodRepo.findManyByCustomer({
      customerId: params.customerId,
      skip,
      take: pageSize,
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
