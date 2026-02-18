import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FeatureUnit, PaymentMethodType } from '../../domain/enums';

export class UpdatePlanFeatureInput {
  @ApiProperty({ example: 'Dados' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quota!: number;

  @ApiProperty({ enum: FeatureUnit })
  @IsEnum(FeatureUnit)
  unit!: FeatureUnit;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  unlimited?: boolean;
}

export class UpdatePlanDto {
  @ApiProperty({ required: false, example: 'Controle 20GB' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({ required: false, type: [String], enum: PaymentMethodType })
  @IsOptional()
  @IsArray()
  @IsEnum(PaymentMethodType, { each: true })
  allowedPaymentMethods?: PaymentMethodType[];

  @ApiProperty({ required: false, type: [UpdatePlanFeatureInput], description: 'Substituir todas as features' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePlanFeatureInput)
  features?: UpdatePlanFeatureInput[];
}
