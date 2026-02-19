import { ApiProperty } from '@nestjs/swagger';

export class SimCardResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  iccid!: string;

  @ApiProperty({ nullable: true })
  imsi!: string | null;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  supplier!: string;

  @ApiProperty()
  importBatchId!: string;

  @ApiProperty({ nullable: true })
  allocatedToOrderId!: string | null;

  @ApiProperty({ nullable: true })
  allocatedToCustomerId!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class SimCardListResponseDto {
  @ApiProperty({ type: [SimCardResponseDto] })
  data!: SimCardResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  pageSize!: number;
}
