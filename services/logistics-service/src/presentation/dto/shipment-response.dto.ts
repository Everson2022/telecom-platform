export class ShipmentStatusHistoryDto {
  id!: string;
  shipmentId!: string;
  status!: string;
  notes!: string | null;
  recordedAt!: Date;
}

export class ShipmentResponseDto {
  id!: string;
  orderId!: string;
  customerId!: string;
  simId!: string | null;
  iccid!: string;
  carrier!: string;
  trackingCode!: string | null;
  status!: string;
  addressZipCode!: string;
  addressStreet!: string;
  addressNumber!: string;
  addressComplement!: string | null;
  addressNeighborhood!: string;
  addressCity!: string;
  addressState!: string;
  estimatedDeliveryDate!: Date | null;
  actualDeliveryDate!: Date | null;
  failureReason!: string | null;
  statusHistory!: ShipmentStatusHistoryDto[];
  createdAt!: Date;
  updatedAt!: Date;
}
