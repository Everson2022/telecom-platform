import { ApiProperty } from '@nestjs/swagger';

export class SimImportErrorResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  rowNumber!: number;

  @ApiProperty({ nullable: true })
  iccid!: string | null;

  @ApiProperty()
  errorMessage!: string;
}

export class SimImportBatchResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  supplier!: string;

  @ApiProperty()
  fileName!: string;

  @ApiProperty()
  simType!: string;

  @ApiProperty()
  totalRecords!: number;

  @ApiProperty()
  successCount!: number;

  @ApiProperty()
  errorCount!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty({ type: [SimImportErrorResponseDto] })
  errors!: SimImportErrorResponseDto[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
