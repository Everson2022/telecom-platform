import { Injectable, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor } from '@telecom/toolkit/grpc';
import { PlanRepository } from '../database/repositories/plan.repository';
import { OfferRepository } from '../database/repositories/offer.repository';
import { PriceLocalityRepository } from '../database/repositories/price-locality.repository';

@Injectable()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class CatalogGrpcController {
  constructor(
    private readonly planRepo: PlanRepository,
    private readonly offerRepo: OfferRepository,
    private readonly priceLocalityRepo: PriceLocalityRepository,
  ) {}

  @GrpcMethod('CatalogQueryService', 'GetPlanById')
  async getPlanById(data: { planId: string }) {
    const plan = await this.planRepo.findById(data.planId);
    if (!plan) {
      throw new Error(`Plan ${data.planId} not found`);
    }
    return plan;
  }

  @GrpcMethod('CatalogQueryService', 'ListPlans')
  async listPlans(data: { status?: string }) {
    const where: any = {};
    if (data.status) {
      where.status = data.status;
    }
    const { data: plans } = await this.planRepo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return { plans };
  }

  @GrpcMethod('CatalogQueryService', 'GetOfferById')
  async getOfferById(data: { offerId: string }) {
    const offer = await this.offerRepo.findById(data.offerId);
    if (!offer) {
      throw new Error(`Offer ${data.offerId} not found`);
    }
    return offer;
  }

  @GrpcMethod('CatalogQueryService', 'GetOfferPriceByLocality')
  async getOfferPriceByLocality(data: { offerId: string; dddCode: string; city?: string }) {
    const price = await this.priceLocalityRepo.findByLocality(
      data.offerId,
      data.dddCode,
      data.city,
    );

    if (!price) {
      // Fallback: buscar preco apenas por DDD (sem cidade)
      if (data.city) {
        const fallback = await this.priceLocalityRepo.findByLocality(
          data.offerId,
          data.dddCode,
        );
        if (fallback) {
          return fallback;
        }
      }

      // Se nao encontrou preco por localidade, retornar preco base da oferta
      const offer = await this.offerRepo.findById(data.offerId);
      if (!offer) {
        throw new Error(`Offer ${data.offerId} not found`);
      }
      return {
        offerId: offer.id,
        dddCode: data.dddCode,
        city: data.city ?? null,
        priceAmountCents: offer.basePriceAmountCents,
        priceCurrency: offer.basePriceCurrency,
      };
    }

    return price;
  }

  @GrpcMethod('CatalogQueryService', 'CheckEligibility')
  async checkEligibility(data: { offerId: string; customerId: string }) {
    const offer = await this.offerRepo.findById(data.offerId);
    if (!offer) {
      throw new Error(`Offer ${data.offerId} not found`);
    }

    // Verificar se oferta esta ativa
    if (offer.status !== 'ACTIVE') {
      return { eligible: false, reason: 'Offer is not active' };
    }

    // Verificar validade temporal
    const now = new Date();
    if (now < offer.validFrom) {
      return { eligible: false, reason: 'Offer is not yet valid' };
    }
    if (offer.validUntil && now > offer.validUntil) {
      return { eligible: false, reason: 'Offer has expired' };
    }

    return { eligible: true, reason: null };
  }
}
