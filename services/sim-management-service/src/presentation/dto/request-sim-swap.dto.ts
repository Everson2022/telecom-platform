import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsString, MaxLength } from 'class-validator';
import { SwapType, SwapReason } from '../../domain/enums';

export class RequestSimSwapDto {
  @ApiProperty({ description: 'Customer ID' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ description: 'MSISDN (phone number)', example: '5511999999999' })
  @IsString()
  @MaxLength(20)
  msisdn!: string;

  @ApiProperty({ description: 'Old SIM card ID' })
  @IsUUID()
  oldSimId!: string;

  @ApiProperty({ description: 'New SIM card ID' })
  @IsUUID()
  newSimId!: string;

  @ApiProperty({ enum: SwapType, description: 'Type of SIM swap' })
  @IsEnum(SwapType)
  swapType!: SwapType;

  @ApiProperty({ enum: SwapReason, description: 'Reason for SIM swap' })
  @IsEnum(SwapReason)
  reason!: SwapReason;

  @ApiProperty({ description: 'Order ID' })
  @IsUUID()
  orderId!: string;
}
