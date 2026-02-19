import { Injectable } from '@nestjs/common';
import { SimCardRepository } from '../../infrastructure/database/repositories/sim-card.repository';
import { SimStatus, SimType } from '../../domain/enums';
import { SimCardRecord } from '../../domain/types';

export interface ListAvailableSimsInput {
  status?: SimStatus;
  simType?: SimType;
  page?: number;
  pageSize?: number;
}

export interface ListAvailableSimsResult {
  data: SimCardRecord[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListAvailableSimsQuery {
  constructor(private readonly simCardRepo: SimCardRepository) {}

  async execute(input: ListAvailableSimsInput): Promise<ListAvailableSimsResult> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const { data, total } = await this.simCardRepo.findMany({
      status: input.status,
      simType: input.simType,
      skip,
      take: pageSize,
    });

    return { data, total, page, pageSize };
  }
}
