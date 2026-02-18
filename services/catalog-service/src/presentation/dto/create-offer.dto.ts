import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  IsDateString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsAfterDate } from '../validators/is-after-date.validator';

export class CreateEligibilityRuleInput {
  @ApiProperty({ example: 'MIN_AGE', description: 'Tipo da regra' })
  @IsString()
  @MaxLength(50)
  ruleType!: string;

  @ApiProperty({ example: { value: 18 }, description: 'Valor/configuracao da regra' })
  ruleValue!: Record<string, unknown>;
}

export class CreateOfferDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID do plano' })
  @IsUUID()
  planId!: string;

  @ApiProperty({ example: 'Oferta Verao 2025', description: 'Nome da oferta' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ example: 4990, description: 'Preco base em centavos' })
  @IsInt()
  @Min(1)
  basePriceAmountCents!: number;

  @ApiProperty({ required: false, default: 'BRL', example: 'BRL' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  basePriceCurrency?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z', description: 'Inicio da validade' })
  @IsDateString()
  validFrom!: string;

  @ApiProperty({ required: false, example: '2025-12-31T23:59:59Z', description: 'Fim da validade' })
  @IsOptional()
  @IsDateString()
  @IsAfterDate('validFrom')
  validUntil?: string;

  @ApiProperty({ required: false, type: [CreateEligibilityRuleInput], description: 'Regras de elegibilidade' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEligibilityRuleInput)
  eligibilityRules?: CreateEligibilityRuleInput[];
}
