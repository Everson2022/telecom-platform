import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './plan-response.dto';

export class EligibilityRuleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() ruleType!: string;
  @ApiProperty() ruleValue!: Record<string, unknown>;
}

export class PriceLocalityResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() dddCode!: string;
  @ApiProperty({ required: false }) city?: string;
  @ApiProperty() priceAmountCents!: number;
  @ApiProperty() priceCurrency!: string;
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] }) status!: string;
}

export class OfferResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() planId!: string;
  @ApiProperty() name!: string;
  @ApiProperty() basePriceAmountCents!: number;
  @ApiProperty() basePriceCurrency!: string;
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] }) status!: string;
  @ApiProperty() validFrom!: string;
  @ApiProperty({ required: false }) validUntil?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
  @ApiProperty({ type: [EligibilityRuleResponseDto] }) eligibilityRules!: EligibilityRuleResponseDto[];
  @ApiProperty({ type: [PriceLocalityResponseDto] }) localityPrices!: PriceLocalityResponseDto[];
}

export class OfferListResponseDto {
  @ApiProperty({ type: [OfferResponseDto] }) data!: OfferResponseDto[];
  @ApiProperty({ type: PaginationDto }) pagination!: PaginationDto;
}
