import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PaymentTransactionRecord = Prisma.PaymentTransactionGetPayload<{}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type RecurringBillingRecord = Prisma.RecurringBillingGetPayload<{}>;

export type PaymentMethodWithRelations = Prisma.PaymentMethodGetPayload<{
  include: { transactions: true; recurringBilling: true };
}>;

export type PaymentMethodRecord = Prisma.PaymentMethodGetPayload<{
  include: { recurringBilling: true };
}>;
