import { ApiProperty } from '@nestjs/swagger';
import { RecurringStatus } from '../../domain/enums';

export class RecurringBillingResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() customerId!: string;
  @ApiProperty() subscriptionId!: string;
  @ApiProperty() paymentMethodId!: string;
  @ApiProperty() amountCents!: number;
  @ApiProperty() currency!: string;
  @ApiProperty() billingDay!: number;
  @ApiProperty({ enum: RecurringStatus }) status!: RecurringStatus;
  @ApiProperty() nextBillingDate!: string;
  @ApiProperty({ nullable: true }) lastBillingDate!: string | null;
  @ApiProperty() consecutiveFailures!: number;
  @ApiProperty() maxRetries!: number;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
