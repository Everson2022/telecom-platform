import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateLocalityDto {
  @ApiProperty({ example: '11' })
  @IsString()
  @Length(2, 3)
  dddCode: string;

  @ApiProperty({ example: 'Sao Paulo' })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: 'Sudeste' })
  @IsString()
  @Length(1, 50)
  region: string;

  @ApiProperty({ example: '3550308' })
  @IsString()
  @Length(7, 10)
  ibgeCode: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  hasCoverage?: boolean;
}
