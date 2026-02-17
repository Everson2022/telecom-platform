import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsArray,
  IsBoolean,
  MaxLength,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanFeatureInput {
  @ApiProperty({ example: 'Dados', description: 'Nome da feature/franquia' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 10, description: 'Valor da franquia' })
  @IsInt()
  @Min(0)
  quota!: number;

  @ApiProperty({ enum: ['GB', 'MIN', 'UNIT'], description: 'Unidade da franquia' })
  @IsEnum(['GB', 'MIN', 'UNIT'])
  unit!: 'GB' | 'MIN' | 'UNIT';

  @ApiProperty({ required: false, default: false, description: 'Se a franquia e ilimitada' })
  @IsOptional()
  @IsBoolean()
  unlimited?: boolean;
}

export class CreatePlanDto {
  @ApiProperty({ example: 'Controle 15GB', description: 'Nome unico do plano' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ enum: ['CONTROL', 'PREPAID', 'POSTPAID'], description: 'Tipo do plano' })
  @IsEnum(['CONTROL', 'PREPAID', 'POSTPAID'])
  type!: 'CONTROL' | 'PREPAID' | 'POSTPAID';

  @ApiProperty({
    required: false,
    description: 'Maximo de linhas (auto-definido pelo tipo se omitido)',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxLines?: number;

  @ApiProperty({
    type: [String],
    enum: ['CARD', 'PIX'],
    description: 'Metodos de pagamento permitidos',
    example: ['CARD', 'PIX'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(['CARD', 'PIX'], { each: true })
  allowedPaymentMethods!: ('CARD' | 'PIX')[];

  @ApiProperty({ type: [CreatePlanFeatureInput], required: false, description: 'Features/franquias do plano' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlanFeatureInput)
  features?: CreatePlanFeatureInput[];
}
