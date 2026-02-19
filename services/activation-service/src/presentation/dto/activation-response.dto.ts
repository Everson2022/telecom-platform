export class ActivationResponseDto {
  id!: string;
  orderId!: string;
  customerId!: string;
  iccid!: string;
  msisdn!: string;
  imsi!: string | null;
  status!: string;
  coreTransactionId!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
