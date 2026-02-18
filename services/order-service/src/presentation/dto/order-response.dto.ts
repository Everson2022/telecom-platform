import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  offerId!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  priceAmountCents!: number;

  @ApiProperty()
  priceCurrency!: string;
}

export class OrderResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  totalAmountCents!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  paymentMethodType!: string;

  @ApiProperty({ nullable: true })
  failureReason!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ nullable: true })
  completedAt!: Date | null;

  @ApiProperty({ type: [OrderItemResponseDto] })
  items!: OrderItemResponseDto[];
}

export class OrderListResponseDto {
  @ApiProperty({ type: [OrderResponseDto] })
  data!: OrderResponseDto[];

  @ApiProperty()
  pagination!: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
