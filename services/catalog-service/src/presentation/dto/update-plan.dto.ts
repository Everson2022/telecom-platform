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

export class UpdatePlanFeatureInput {
  @ApiProperty({ example: 'Dados' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quota!: number;

  @ApiProperty({ enum: ['GB', 'MIN', 'UNIT'] })
  @IsEnum(['GB', 'MIN', 'UNIT'])
  unit!: 'GB' | 'MIN' | 'UNIT';

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

  @ApiProperty({ required: false, type: [String], enum: ['CARD', 'PIX'] })
  @IsOptional()
  @IsArray()
  @IsEnum(['CARD', 'PIX'], { each: true })
  allowedPaymentMethods?: ('CARD' | 'PIX')[];

  @ApiProperty({ required: false, type: [UpdatePlanFeatureInput], description: 'Substituir todas as features' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePlanFeatureInput)
  features?: UpdatePlanFeatureInput[];
}
