export const PaymentMethodType = {
  CARD: 'CARD',
  PIX: 'PIX',
} as const;

export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];
