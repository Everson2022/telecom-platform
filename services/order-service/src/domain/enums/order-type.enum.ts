export const OrderType = {
  NEW_PLAN: 'NEW_PLAN',
  ADD_LINE: 'ADD_LINE',
  SIM_SWAP: 'SIM_SWAP',
  PLAN_CHANGE: 'PLAN_CHANGE',
  CANCELLATION: 'CANCELLATION',
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
