import { Injectable, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor } from '@telecom/toolkit/grpc';
import { GetSimByIdQuery } from '../../application/queries/get-sim-by-id.query';
import { GetSimByIccidQuery } from '../../application/queries/get-sim-by-iccid.query';
import { ListAvailableSimsQuery } from '../../application/queries/list-available-sims.query';
import { SimCardRecord } from '../../domain/types';
import { SimStatus, SimType } from '../../domain/enums';

interface GetSimByIccidRequest {
  iccid: string;
}

interface GetSimByIdRequest {
  id: string;
}

interface ListAvailableSimsRequest {
  simType?: string;
  page?: number;
  pageSize?: number;
}

interface CheckSimAvailabilityRequest {
  simCardId: string;
}

interface SimCardGrpcResponse {
  id: string;
  iccid: string;
  imsi: string | null;
  type: string;
  status: string;
  supplier: string;
  importBatchId: string;
  allocatedToOrderId: string | null;
  allocatedToCustomerId: string | null;
}

@Injectable()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class SimGrpcController {
  constructor(
    private readonly getSimByIdQuery: GetSimByIdQuery,
    private readonly getSimByIccidQuery: GetSimByIccidQuery,
    private readonly listAvailableSimsQuery: ListAvailableSimsQuery,
  ) {}

  @GrpcMethod('SimQueryService', 'GetSimByIccid')
  async getSimByIccid(data: GetSimByIccidRequest): Promise<SimCardGrpcResponse> {
    const sim = await this.getSimByIccidQuery.execute(data.iccid);
    return this.mapSimToResponse(sim);
  }

  @GrpcMethod('SimQueryService', 'GetSimById')
  async getSimById(data: GetSimByIdRequest): Promise<SimCardGrpcResponse> {
    const sim = await this.getSimByIdQuery.execute(data.id);
    return this.mapSimToResponse(sim);
  }

  @GrpcMethod('SimQueryService', 'ListAvailableSims')
  async listAvailableSims(
    data: ListAvailableSimsRequest,
  ): Promise<{ sims: SimCardGrpcResponse[] }> {
    const { data: sims } = await this.listAvailableSimsQuery.execute({
      status: SimStatus.AVAILABLE,
      simType: data.simType as SimType | undefined,
      page: data.page,
      pageSize: data.pageSize,
    });
    return { sims: sims.map((s) => this.mapSimToResponse(s)) };
  }

  @GrpcMethod('SimQueryService', 'CheckSimAvailability')
  async checkSimAvailability(
    data: CheckSimAvailabilityRequest,
  ): Promise<{ available: boolean }> {
    try {
      const sim = await this.getSimByIdQuery.execute(data.simCardId);
      return { available: sim.status === SimStatus.AVAILABLE };
    } catch {
      return { available: false };
    }
  }

  private mapSimToResponse(sim: SimCardRecord): SimCardGrpcResponse {
    return {
      id: sim.id,
      iccid: sim.iccid,
      imsi: sim.imsi,
      type: sim.type,
      status: sim.status,
      supplier: sim.supplier,
      importBatchId: sim.importBatchId,
      allocatedToOrderId: sim.allocatedToOrderId,
      allocatedToCustomerId: sim.allocatedToCustomerId,
    };
  }
}
