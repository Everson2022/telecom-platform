import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, IsOptional, IsUUID, Min, MaxLength } from 'class-validator';
import { TransactionType } from '../../domain/enums';

export class ProcessPaymentDto {
  @ApiProperty({ description: 'ID do metodo de pagamento' })
  @IsUUID()
  paymentMethodId!: string;

  @ApiProperty({ description: 'ID do cliente' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ description: 'ID da assinatura' })
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty({ description: 'ID do pedido (opcional)', required: false })
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @ApiProperty({ enum: TransactionType, description: 'Tipo da transacao' })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiProperty({ example: 2999, description: 'Valor em centavos' })
  @IsInt()
  @Min(1)
  amountCents!: number;

  @ApiProperty({ example: 'BRL', required: false, description: 'Moeda (padrao: BRL)' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({ description: 'Chave de idempotencia unica para evitar duplicidades' })
  @IsString()
  @MaxLength(255)
  idempotencyKey!: string;
}
