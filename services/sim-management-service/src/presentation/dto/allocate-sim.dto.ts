import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';
import { SimType } from '../../domain/enums';

export class AllocateSimDto {
  @ApiProperty({ description: 'Order ID' })
  @IsUUID()
  orderId!: string;

  @ApiProperty({ description: 'Customer ID' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ enum: SimType, description: 'Type of SIM card to allocate' })
  @IsEnum(SimType)
  simType!: SimType;

  @ApiProperty({ description: 'Preferred ICCID (optional)', required: false })
  @IsOptional()
  @IsString()
  preferredIccid?: string;
}
