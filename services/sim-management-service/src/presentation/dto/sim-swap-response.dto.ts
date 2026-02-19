import { ApiProperty } from '@nestjs/swagger';

export class SimSwapResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  msisdn!: string;

  @ApiProperty()
  oldSimId!: string;

  @ApiProperty()
  newSimId!: string;

  @ApiProperty()
  swapType!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  reason!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty({ nullable: true })
  failureReason!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
