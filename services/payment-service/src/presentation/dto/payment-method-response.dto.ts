import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType, PaymentMethodStatus } from '../../domain/enums';

export class PaymentMethodResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() customerId!: string;
  @ApiProperty() subscriptionId!: string;
  @ApiProperty({ enum: PaymentMethodType }) type!: PaymentMethodType;
  @ApiProperty({ enum: PaymentMethodStatus }) status!: PaymentMethodStatus;
  @ApiProperty({ nullable: true }) cardLastFour!: string | null;
  @ApiProperty({ nullable: true }) cardBrand!: string | null;
  @ApiProperty({ nullable: true }) cardHolderName!: string | null;
  @ApiProperty({ nullable: true }) cardExpMonth!: number | null;
  @ApiProperty({ nullable: true }) cardExpYear!: number | null;
  @ApiProperty({ nullable: true }) pixKeyType!: string | null;
  @ApiProperty({ nullable: true }) pixKey!: string | null;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class PaginationDto {
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
  @ApiProperty() totalItems!: number;
  @ApiProperty() totalPages!: number;
}

export class PaymentMethodListResponseDto {
  @ApiProperty({ type: [PaymentMethodResponseDto] }) data!: PaymentMethodResponseDto[];
  @ApiProperty({ type: PaginationDto }) pagination!: PaginationDto;
}
