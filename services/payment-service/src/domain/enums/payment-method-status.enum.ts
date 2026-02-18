export const PaymentMethodStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
} as const;

export type PaymentMethodStatus = (typeof PaymentMethodStatus)[keyof typeof PaymentMethodStatus];
