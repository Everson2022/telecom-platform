export const AddressType = {
  RESIDENTIAL: 'RESIDENTIAL',
  BILLING: 'BILLING',
  SHIPPING: 'SHIPPING',
} as const;

export type AddressType = (typeof AddressType)[keyof typeof AddressType];
