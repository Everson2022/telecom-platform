import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class GetLocalityPriceQueryDto {
  @ApiProperty({ example: '11', description: 'Codigo DDD' })
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  dddCode!: string;

  @ApiProperty({ required: false, example: 'Sao Paulo' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;
}
