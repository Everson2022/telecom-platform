import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';
import { AddressType } from '../../domain/enums';

export class CreateAddressDto {
  @ApiProperty({ enum: AddressType })
  @IsEnum(AddressType)
  type!: AddressType;

  @ApiProperty({ example: '01001-000' })
  @IsString()
  @MaxLength(10)
  zipCode!: string;

  @ApiProperty({ example: 'Rua das Flores' })
  @IsString()
  @MaxLength(255)
  street!: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @MaxLength(20)
  number!: string;

  @ApiProperty({ example: 'Apto 42', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  complement?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @MaxLength(100)
  neighborhood!: string;

  @ApiProperty({ example: 'Sao Paulo' })
  @IsString()
  @MaxLength(100)
  city!: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  state!: string;

  @ApiProperty({ example: '11' })
  @IsString()
  @MaxLength(3)
  dddCode!: string;

  @ApiProperty({ example: 'BR', required: false, default: 'BR' })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  country?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
