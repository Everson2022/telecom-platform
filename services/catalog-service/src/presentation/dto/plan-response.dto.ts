import { ApiProperty } from '@nestjs/swagger';
import { PlanType, PlanStatus, FeatureUnit } from '../../domain/enums';

export class PlanFeatureResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() quota!: number;
  @ApiProperty({ enum: FeatureUnit }) unit!: FeatureUnit;
  @ApiProperty() unlimited!: boolean;
}

export class PlanResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: PlanType }) type!: PlanType;
  @ApiProperty() maxLines!: number;
  @ApiProperty({ enum: PlanStatus }) status!: PlanStatus;
  @ApiProperty({ type: [String] }) allowedPaymentMethods!: string[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
  @ApiProperty({ type: [PlanFeatureResponseDto] }) features!: PlanFeatureResponseDto[];
}

export class PaginationDto {
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
  @ApiProperty() totalItems!: number;
  @ApiProperty() totalPages!: number;
}

export class PlanListResponseDto {
  @ApiProperty({ type: [PlanResponseDto] }) data!: PlanResponseDto[];
  @ApiProperty({ type: PaginationDto }) pagination!: PaginationDto;
}
