export const OfferStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus];
