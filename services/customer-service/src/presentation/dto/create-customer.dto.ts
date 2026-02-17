import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsDateString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsEnum,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDocumentInput {
  @ApiProperty({ enum: ['CPF', 'RG', 'CNH', 'PASSPORT'] })
  @IsEnum(['CPF', 'RG', 'CNH', 'PASSPORT'])
  type!: 'CPF' | 'RG' | 'CNH' | 'PASSPORT';

  @ApiProperty({ example: '123456789' })
  @IsString()
  @MaxLength(50)
  number!: string;

  @ApiProperty({ example: 'SSP/SP' })
  @IsString()
  @MaxLength(100)
  issuingAuthority!: string;

  @ApiProperty({ example: '2020-01-15' })
  @IsDateString()
  issueDate!: string;

  @ApiProperty({ example: '2030-01-15', required: false })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;
}

export class CreateAddressInput {
  @ApiProperty({ enum: ['RESIDENTIAL', 'BILLING', 'SHIPPING'] })
  @IsEnum(['RESIDENTIAL', 'BILLING', 'SHIPPING'])
  type!: 'RESIDENTIAL' | 'BILLING' | 'SHIPPING';

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

export class CreateCustomerDto {
  @ApiProperty({ example: 'Joao da Silva' })
  @IsString()
  @MaxLength(255)
  fullName!: string;

  @ApiProperty({ example: '529.982.247-25', description: 'CPF valido' })
  @IsString()
  cpf!: string;

  @ApiProperty({ example: '1990-05-15' })
  @IsDateString()
  birthDate!: string;

  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '11999998888' })
  @IsString()
  phone!: string;

  @ApiProperty({ type: [CreateDocumentInput], minItems: 1 })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentInput)
  documents!: CreateDocumentInput[];

  @ApiProperty({ type: [CreateAddressInput], minItems: 1 })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressInput)
  addresses!: CreateAddressInput[];
}
