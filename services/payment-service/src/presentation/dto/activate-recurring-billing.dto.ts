import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsUUID, Min, Max, MaxLength } from 'class-validator';

export class ActivateRecurringBillingDto {
  @ApiProperty({ description: 'ID do cliente' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ description: 'ID da assinatura' })
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty({ description: 'ID do metodo de pagamento' })
  @IsUUID()
  paymentMethodId!: string;

  @ApiProperty({ example: 2999, description: 'Valor em centavos' })
  @IsInt()
  @Min(1)
  amountCents!: number;

  @ApiProperty({ example: 'BRL', required: false, description: 'Moeda (padrao: BRL)' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({ example: 15, description: 'Dia do mes para cobranca (1-28)' })
  @IsInt()
  @Min(1)
  @Max(28)
  billingDay!: number;

  @ApiProperty({ example: 3, required: false, description: 'Maximo de tentativas (padrao: 3)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  maxRetries?: number;
}
