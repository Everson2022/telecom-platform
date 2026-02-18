import { Prisma } from '@prisma/client';

export type PlanWithFeatures = Prisma.PlanGetPayload<{
  include: { features: true };
}>;

export type OfferWithRelations = Prisma.OfferGetPayload<{
  include: { plan: true; eligibilityRules: true; localityPrices: true };
}>;

export type PlanFeatureRecord = Prisma.PlanFeatureGetPayload<Record<string, never>>;
export type PriceLocalityRecord = Prisma.PriceLocalityGetPayload<Record<string, never>>;
export type EligibilityRuleRecord = Prisma.EligibilityRuleGetPayload<Record<string, never>>;
