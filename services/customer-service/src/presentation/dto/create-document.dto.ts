import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { DocumentType } from '../../domain/enums';

export class CreateDocumentDto {
  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  type!: DocumentType;

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
