import { IsString, IsEnum, IsOptional, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlanType } from '../../domain/enums';

export class CreateSubscriptionLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  msisdn!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iccid!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  simType!: string;
}

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  planId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  offerId!: string;

  @ApiProperty({ enum: PlanType })
  @IsEnum(PlanType)
  planType!: PlanType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentMethodId?: string;

  @ApiProperty()
  @IsNumber()
  monthlyAmountCents!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ type: CreateSubscriptionLineDto })
  @ValidateNested()
  @Type(() => CreateSubscriptionLineDto)
  line!: CreateSubscriptionLineDto;
}
