export const RecurringStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED',
} as const;

export type RecurringStatus = (typeof RecurringStatus)[keyof typeof RecurringStatus];
