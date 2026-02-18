export const CustomerStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CANCELLED: 'CANCELLED',
} as const;

export type CustomerStatus = (typeof CustomerStatus)[keyof typeof CustomerStatus];
