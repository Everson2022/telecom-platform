import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, MaxLength } from 'class-validator';
import { SimType } from '../../domain/enums';

export class ImportSimBatchDto {
  @ApiProperty({ description: 'CSV content with SIM card data' })
  @IsString()
  csvContent!: string;

  @ApiProperty({ description: 'Supplier name', example: 'Supplier A' })
  @IsString()
  @MaxLength(100)
  supplier!: string;

  @ApiProperty({ description: 'File name', example: 'sims-batch-001.csv' })
  @IsString()
  @MaxLength(255)
  fileName!: string;

  @ApiProperty({ enum: SimType, description: 'Type of SIM cards in the batch' })
  @IsEnum(SimType)
  simType!: SimType;
}
