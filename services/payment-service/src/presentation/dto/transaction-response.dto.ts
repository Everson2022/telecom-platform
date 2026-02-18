import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../../domain/enums';

export class TransactionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() paymentMethodId!: string;
  @ApiProperty() customerId!: string;
  @ApiProperty() subscriptionId!: string;
  @ApiProperty({ nullable: true }) orderId!: string | null;
  @ApiProperty({ enum: TransactionType }) type!: TransactionType;
  @ApiProperty({ enum: TransactionStatus }) status!: TransactionStatus;
  @ApiProperty() amountCents!: number;
  @ApiProperty() currency!: string;
  @ApiProperty({ nullable: true }) gatewayTransactionId!: string | null;
  @ApiProperty({ nullable: true }) failureReason!: string | null;
  @ApiProperty() retryCount!: number;
  @ApiProperty() idempotencyKey!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class PaginationDto {
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
  @ApiProperty() totalItems!: number;
  @ApiProperty() totalPages!: number;
}

export class TransactionListResponseDto {
  @ApiProperty({ type: [TransactionResponseDto] }) data!: TransactionResponseDto[];
  @ApiProperty({ type: PaginationDto }) pagination!: PaginationDto;
}
