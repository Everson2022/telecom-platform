import { Injectable } from '@nestjs/common';
import { OfferStatus } from '../../domain/enums';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';

export interface ListOffersParams {
  page?: number;
  pageSize?: number;
  status?: OfferStatus;
  planId?: string;
  search?: string;
}

@Injectable()
export class ListOffersQuery {
  constructor(private readonly offerRepo: OfferRepository) {}

  async execute(params: ListOffersParams) {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (params.status) {
      where.status = params.status;
    }
    if (params.planId) {
      where.planId = params.planId;
    }
    if (params.search) {
      where.name = { contains: params.search, mode: 'insensitive' };
    }

    const { data, total } = await this.offerRepo.findMany({
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
