export const CUSTOMER_EVENTS = {
  REGISTERED: 'customer.registered',
  UPDATED: 'customer.updated',
  DOCUMENT_ADDED: 'customer.document.added',
  DOCUMENT_VERIFIED: 'customer.document.verified',
  ADDRESS_ADDED: 'customer.address.added',
  SUSPENDED: 'customer.suspended',
  REACTIVATED: 'customer.reactivated',
  CANCELLED: 'customer.cancelled',
} as const;

export interface CustomerRegisteredPayload {
  customerId: string;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

export interface CustomerUpdatedPayload {
  customerId: string;
  changes: Record<string, unknown>;
}

export interface CustomerDocumentAddedPayload {
  customerId: string;
  documentId: string;
  type: string;
  number: string;
}

export interface CustomerDocumentVerifiedPayload {
  customerId: string;
  documentId: string;
}

export interface CustomerAddressAddedPayload {
  customerId: string;
  addressId: string;
  type: string;
  dddCode: string;
}

export interface CustomerStatusChangedPayload {
  customerId: string;
  previousStatus: string;
  newStatus: string;
}
