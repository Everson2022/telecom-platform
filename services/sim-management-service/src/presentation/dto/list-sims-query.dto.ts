import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { SimStatus, SimType } from '../../domain/enums';

export class ListSimsQueryDto {
  @ApiProperty({ enum: SimStatus, required: false, description: 'Filter by SIM status' })
  @IsOptional()
  @IsEnum(SimStatus)
  status?: SimStatus;

  @ApiProperty({ enum: SimType, required: false, description: 'Filter by SIM type' })
  @IsOptional()
  @IsEnum(SimType)
  simType?: SimType;

  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;
}
