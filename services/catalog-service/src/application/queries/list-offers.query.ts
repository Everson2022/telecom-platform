import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OfferStatus } from '../../domain/enums';
import { OfferRepository } from '../../infrastructure/database/repositories/offer.repository';
import { OfferWithRelations } from '../../domain/types';

export interface ListOffersParams {
  page?: number;
  pageSize?: number;
  status?: OfferStatus;
  planId?: string;
  search?: string;
}

export interface PaginatedOffers {
  data: OfferWithRelations[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

@Injectable()
export class ListOffersQuery {
  constructor(private readonly offerRepo: OfferRepository) {}

  async execute(params: ListOffersParams): Promise<PaginatedOffers> {
    const page = params.page ?? 1;
    const pageSize = Math.min(params.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;

    const where: Prisma.OfferWhereInput = {};
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
