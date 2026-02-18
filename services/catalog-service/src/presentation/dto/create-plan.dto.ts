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
import { PlanType, FeatureUnit, PaymentMethodType } from '../../domain/enums';

export class CreatePlanFeatureInput {
  @ApiProperty({ example: 'Dados', description: 'Nome da feature/franquia' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 10, description: 'Valor da franquia' })
  @IsInt()
  @Min(0)
  quota!: number;

  @ApiProperty({ enum: FeatureUnit, description: 'Unidade da franquia' })
  @IsEnum(FeatureUnit)
  unit!: FeatureUnit;

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

  @ApiProperty({ enum: PlanType, description: 'Tipo do plano' })
  @IsEnum(PlanType)
  type!: PlanType;

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
    enum: PaymentMethodType,
    description: 'Metodos de pagamento permitidos',
    example: [PaymentMethodType.CARD, PaymentMethodType.PIX],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(PaymentMethodType, { each: true })
  allowedPaymentMethods!: PaymentMethodType[];

  @ApiProperty({ type: [CreatePlanFeatureInput], required: false, description: 'Features/franquias do plano' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlanFeatureInput)
  features?: CreatePlanFeatureInput[];
}
