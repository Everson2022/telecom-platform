export const PAYMENT_EVENTS = {
  METHOD_REGISTERED: 'payment.method.registered',
  METHOD_REMOVED: 'payment.method.removed',
  PROCESSED: 'payment.processed',
  FAILED: 'payment.failed',
  REFUNDED: 'payment.refunded',
  RECURRING_ACTIVATED: 'payment.recurring.activated',
  RECURRING_PROCESSED: 'payment.recurring.processed',
  RECURRING_FAILED: 'payment.recurring.failed',
  RECURRING_MAX_RETRIES_EXCEEDED: 'payment.recurring.max-retries-exceeded',
  RECURRING_CANCELLED: 'payment.recurring.cancelled',
  OVERDUE: 'payment.overdue',
} as const;

export interface PaymentMethodRegisteredPayload {
  paymentMethodId: string;
  customerId: string;
  subscriptionId: string;
  type: string;
}

export interface PaymentProcessedPayload {
  transactionId: string;
  paymentMethodId: string;
  customerId: string;
  subscriptionId: string;
  orderId: string | null;
  amountCents: number;
  currency: string;
  gatewayTransactionId: string;
  type: string;
}

export interface PaymentFailedPayload {
  transactionId: string;
  paymentMethodId: string;
  customerId: string;
  subscriptionId: string;
  orderId: string | null;
  amountCents: number;
  failureReason: string;
  type: string;
}

export interface PaymentRefundedPayload {
  transactionId: string;
  originalTransactionId: string;
  paymentMethodId: string;
  customerId: string;
  subscriptionId: string;
  amountCents: number;
  gatewayTransactionId: string;
}

export interface RecurringBillingActivatedPayload {
  recurringBillingId: string;
  customerId: string;
  subscriptionId: string;
  paymentMethodId: string;
  amountCents: number;
  currency: string;
  billingDay: number;
  nextBillingDate: string;
}

export interface RecurringBillingProcessedPayload {
  recurringBillingId: string;
  transactionId: string;
  customerId: string;
  subscriptionId: string;
  amountCents: number;
  nextBillingDate: string;
}

export interface RecurringBillingFailedPayload {
  recurringBillingId: string;
  customerId: string;
  subscriptionId: string;
  amountCents: number;
  consecutiveFailures: number;
  failureReason: string;
}

export interface RecurringBillingMaxRetriesExceededPayload {
  recurringBillingId: string;
  customerId: string;
  subscriptionId: string;
  amountCents: number;
  consecutiveFailures: number;
}

export interface PaymentOverduePayload {
  customerId: string;
  subscriptionId: string;
  amountCents: number;
  recurringBillingId: string;
}
