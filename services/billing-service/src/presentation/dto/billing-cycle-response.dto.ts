export class BillingCycleResponseDto {
  id!: string;
  subscriptionId!: string;
  customerId!: string;
  cycleStartDate!: Date;
  cycleEndDate!: Date;
  dueDate!: Date;
  amountCents!: number;
  currency!: string;
  status!: string;
  paymentTransactionId!: string | null;
  invoiceNumber!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ExternalBillingReferenceResponseDto {
  id!: string;
  subscriptionId!: string;
  externalSystemId!: string;
  externalAccountId!: string;
  syncStatus!: string;
  lastSyncAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
