import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor } from '@telecom/toolkit/grpc';
import { GetPlanQuery } from '../../application/queries/get-plan.query';
import { ListPlansQuery } from '../../application/queries/list-plans.query';
import { GetOfferQuery } from '../../application/queries/get-offer.query';
import { GetOfferPriceByLocalityQuery } from '../../application/queries/get-offer-price-by-locality.query';
import { PlanWithFeatures, OfferWithRelations } from '../../domain/types';
import { GetPlanByIdDto } from './dto/get-plan-by-id.dto';
import { ListPlansDto } from './dto/list-plans.dto';
import { GetOfferByIdDto } from './dto/get-offer-by-id.dto';
import { GetOfferPriceByLocalityDto } from './dto/get-offer-price-by-locality.dto';
import { CheckEligibilityDto } from './dto/check-eligibility.dto';

interface PlanGrpcResponse {
  id: string;
  name: string;
  type: string;
  maxLines: number;
  status: string;
  allowedPaymentMethods: string[];
  features: Array<{
    id: string;
    name: string;
    quota: number | null;
    unit: string;
    unlimited: boolean;
  }>;
}

interface OfferGrpcResponse {
  id: string;
  planId: string;
  name: string;
  basePriceAmountCents: number;
  basePriceCurrency: string;
  status: string;
  validFrom: string;
  validUntil: string | null;
}

@Injectable()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class CatalogGrpcController {
  constructor(
    private readonly getPlanQuery: GetPlanQuery,
    private readonly listPlansQuery: ListPlansQuery,
    private readonly getOfferQuery: GetOfferQuery,
    private readonly getOfferPriceByLocalityQuery: GetOfferPriceByLocalityQuery,
  ) {}

  @GrpcMethod('CatalogQueryService', 'GetPlanById')
  async getPlanById(data: GetPlanByIdDto): Promise<PlanGrpcResponse> {
    const plan = await this.getPlanQuery.byId(data.planId);
    return this.mapPlanToResponse(plan);
  }

  @GrpcMethod('CatalogQueryService', 'ListPlans')
  async listPlans(data: ListPlansDto): Promise<{ plans: PlanGrpcResponse[] }> {
    const { data: plans } = await this.listPlansQuery.execute({ status: data.status });
    return { plans: plans.map((p) => this.mapPlanToResponse(p)) };
  }

  @GrpcMethod('CatalogQueryService', 'GetOfferById')
  async getOfferById(data: GetOfferByIdDto): Promise<OfferGrpcResponse> {
    const offer = await this.getOfferQuery.byId(data.offerId);
    return this.mapOfferToResponse(offer);
  }

  @GrpcMethod('CatalogQueryService', 'GetOfferPriceByLocality')
  async getOfferPriceByLocality(data: GetOfferPriceByLocalityDto) {
    return this.getOfferPriceByLocalityQuery.execute(data.offerId, data.dddCode, data.city);
  }

  @GrpcMethod('CatalogQueryService', 'CheckEligibility')
  async checkEligibility(data: CheckEligibilityDto): Promise<{ eligible: boolean; reason: string | null }> {
    let offer: OfferWithRelations;
    try {
      offer = await this.getOfferQuery.byId(data.offerId);
    } catch {
      throw new NotFoundException(`Offer ${data.offerId} not found`);
    }

    if (offer.status !== 'ACTIVE') {
      return { eligible: false, reason: 'Offer is not active' };
    }

    const now = new Date();
    if (now < offer.validFrom) {
      return { eligible: false, reason: 'Offer is not yet valid' };
    }
    if (offer.validUntil && now > offer.validUntil) {
      return { eligible: false, reason: 'Offer has expired' };
    }

    return { eligible: true, reason: null };
  }

  private mapPlanToResponse(plan: PlanWithFeatures): PlanGrpcResponse {
    return {
      id: plan.id,
      name: plan.name,
      type: plan.type,
      maxLines: plan.maxLines,
      status: plan.status,
      allowedPaymentMethods: plan.allowedPaymentMethods,
      features: plan.features.map((f) => ({
        id: f.id,
        name: f.name,
        quota: f.quota,
        unit: f.unit,
        unlimited: f.unlimited,
      })),
    };
  }

  private mapOfferToResponse(offer: OfferWithRelations): OfferGrpcResponse {
    return {
      id: offer.id,
      planId: offer.planId,
      name: offer.name,
      basePriceAmountCents: offer.basePriceAmountCents,
      basePriceCurrency: offer.basePriceCurrency,
      status: offer.status,
      validFrom: offer.validFrom.toISOString(),
      validUntil: offer.validUntil?.toISOString() ?? null,
    };
  }
}
