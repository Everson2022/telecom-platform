import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateBillingCycleDto {
  @ApiProperty()
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty()
  @IsUUID()
  customerId!: string;

  @ApiProperty({ description: 'ISO date string' })
  @IsDateString()
  cycleStartDate!: string;

  @ApiProperty({ description: 'ISO date string' })
  @IsDateString()
  cycleEndDate!: string;

  @ApiProperty({ description: 'ISO date string' })
  @IsDateString()
  dueDate!: string;

  @ApiProperty()
  @IsNumber()
  amountCents!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;
}
