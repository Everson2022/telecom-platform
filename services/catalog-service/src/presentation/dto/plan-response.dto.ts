import { ApiProperty } from '@nestjs/swagger';

export class PlanFeatureResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() quota!: number;
  @ApiProperty() unit!: string;
  @ApiProperty() unlimited!: boolean;
}

export class PlanResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ['CONTROL', 'PREPAID', 'POSTPAID'] }) type!: string;
  @ApiProperty() maxLines!: number;
  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE', 'DEPRECATED'] }) status!: string;
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
