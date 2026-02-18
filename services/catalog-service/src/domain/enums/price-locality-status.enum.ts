export const PriceLocalityStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type PriceLocalityStatus = (typeof PriceLocalityStatus)[keyof typeof PriceLocalityStatus];
