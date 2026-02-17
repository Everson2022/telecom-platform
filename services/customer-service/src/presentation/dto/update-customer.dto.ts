import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
  @ApiPropertyOptional({ example: 'Joao da Silva Jr' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fullName?: string;

  @ApiPropertyOptional({ example: 'novo@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '11988887777' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '1990-06-20' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
