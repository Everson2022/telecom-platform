export const CATALOG_EVENTS = {
  PLAN_CREATED: 'catalog.plan.created',
  PLAN_UPDATED: 'catalog.plan.updated',
  PLAN_DEPRECATED: 'catalog.plan.deprecated',
  OFFER_CREATED: 'catalog.offer.created',
  OFFER_UPDATED: 'catalog.offer.updated',
  OFFER_DEACTIVATED: 'catalog.offer.deactivated',
  LOCALITY_PRICE_SET: 'catalog.locality-price.set',
} as const;

export interface PlanCreatedPayload {
  planId: string;
  name: string;
  type: string;
  maxLines: number;
  allowedPaymentMethods: string[];
}

export interface PlanUpdatedPayload {
  planId: string;
  name: string;
  type: string;
}

export interface PlanDeprecatedPayload {
  planId: string;
  name: string;
}

export interface OfferCreatedPayload {
  offerId: string;
  planId: string;
  name: string;
  basePriceAmountCents: number;
  basePriceCurrency: string;
  validFrom: string;
  validUntil?: string;
}

export interface OfferDeactivatedPayload {
  offerId: string;
  name: string;
}

export interface LocalityPriceSetPayload {
  priceLocalityId: string;
  offerId: string;
  dddCode: string;
  city?: string;
  priceAmountCents: number;
  priceCurrency: string;
}
