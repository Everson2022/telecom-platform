import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsArray,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderType } from '../../domain/enums';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'uuid-offer-id', description: 'ID da oferta' })
  @IsUUID()
  offerId!: string;

  @ApiProperty({ example: 1, description: 'Quantidade' })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty({ example: 4990, description: 'Preco em centavos' })
  @IsInt()
  @Min(0)
  priceAmountCents!: number;

  @ApiProperty({ example: 'BRL', required: false, description: 'Moeda (padrao: BRL)' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  priceCurrency?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-customer-id', description: 'ID do cliente' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ enum: OrderType, description: 'Tipo do pedido' })
  @IsEnum(OrderType)
  type!: OrderType;

  @ApiProperty({ example: 4990, description: 'Total em centavos' })
  @IsInt()
  @Min(0)
  totalAmountCents!: number;

  @ApiProperty({ example: 'BRL', required: false, description: 'Moeda (padrao: BRL)' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({ example: 'CARD', description: 'Metodo de pagamento (CARD, PIX, BOLETO)' })
  @IsString()
  @MaxLength(10)
  paymentMethodType!: string;

  @ApiProperty({ type: [CreateOrderItemDto], description: 'Itens do pedido' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
