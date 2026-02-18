export const PlanStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DEPRECATED: 'DEPRECATED',
} as const;

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus];
