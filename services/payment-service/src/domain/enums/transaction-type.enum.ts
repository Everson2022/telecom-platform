export const TransactionType = {
  ONE_TIME: 'ONE_TIME',
  RECURRING: 'RECURRING',
  REFUND: 'REFUND',
  OVERDUE_RECOVERY: 'OVERDUE_RECOVERY',
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
