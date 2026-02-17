import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MaxLength, Min } from 'class-validator';

export class SetLocalityPriceDto {
  @ApiProperty({ example: '11', description: 'Codigo DDD' })
  @IsString()
  @MaxLength(3)
  dddCode!: string;

  @ApiProperty({ required: false, example: 'Sao Paulo', description: 'Cidade (opcional)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({ example: 3990, description: 'Preco em centavos' })
  @IsInt()
  @Min(1)
  priceAmountCents!: number;

  @ApiProperty({ required: false, default: 'BRL', example: 'BRL' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  priceCurrency?: string;
}
