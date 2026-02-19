import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LineRole } from '../../domain/enums';

export class AddServiceLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  msisdn!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iccid!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  simType!: string;

  @ApiPropertyOptional({ enum: LineRole })
  @IsOptional()
  @IsEnum(LineRole)
  role?: LineRole;
}
