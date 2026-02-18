export const ORDER_EVENTS = {
  CREATED: 'order.created',
  CANCELLED: 'order.cancelled',
  PROCESSING_STARTED: 'order.processing.started',
  COMPLETED: 'order.completed',
  FAILED: 'order.failed',
} as const;

export interface OrderCreatedPayload {
  orderId: string;
  customerId: string;
  type: string;
  totalAmountCents: number;
  currency: string;
  paymentMethodType: string;
  items: Array<{
    offerId: string;
    quantity: number;
    priceAmountCents: number;
  }>;
}

export interface OrderCancelledPayload {
  orderId: string;
  customerId: string;
}

export interface OrderProcessingStartedPayload {
  orderId: string;
  customerId: string;
}
