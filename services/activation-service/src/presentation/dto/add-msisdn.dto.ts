import { IsString, IsNotEmpty, Matches, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMsisdnDto {
  @ApiProperty({ example: '+5511900000001' })
  @IsString()
  @IsNotEmpty()
  msisdn!: string;

  @ApiProperty({ example: '11' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}$/)
  dddCode!: string;
}

export class AddMsisdnBatchDto {
  @ApiProperty({ type: [AddMsisdnDto] })
  @IsArray()
  @ArrayNotEmpty()
  msisdns!: AddMsisdnDto[];
}
