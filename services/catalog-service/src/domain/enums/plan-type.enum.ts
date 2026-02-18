export const PlanType = {
  CONTROL: 'CONTROL',
  PREPAID: 'PREPAID',
  POSTPAID: 'POSTPAID',
} as const;

export type PlanType = (typeof PlanType)[keyof typeof PlanType];
