import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsUUID,
  ValidateNested,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethodType } from '../../domain/enums';

export class CardInfoDto {
  @ApiProperty({ example: '1234', description: 'Ultimos 4 digitos do cartao' })
  @IsString()
  @MaxLength(4)
  lastFour!: string;

  @ApiProperty({ example: 'VISA', description: 'Bandeira do cartao' })
  @IsString()
  @MaxLength(20)
  brand!: string;

  @ApiProperty({ example: 'Joao Silva', description: 'Nome do titular no cartao' })
  @IsString()
  @MaxLength(255)
  holderName!: string;

  @ApiProperty({ example: 12, description: 'Mes de vencimento (1-12)' })
  @IsInt()
  @Min(1)
  @Max(12)
  expMonth!: number;

  @ApiProperty({ example: 2028, description: 'Ano de vencimento' })
  @IsInt()
  @Min(2024)
  expYear!: number;

  @ApiProperty({ example: 'tok_abc123', description: 'Token do gateway de pagamento' })
  @IsString()
  @MaxLength(500)
  tokenizedId!: string;
}

export class PixInfoDto {
  @ApiProperty({ example: 'CPF', description: 'Tipo da chave PIX (CPF, EMAIL, PHONE, RANDOM)' })
  @IsString()
  @MaxLength(10)
  keyType!: string;

  @ApiProperty({ example: '12345678901', description: 'Chave PIX' })
  @IsString()
  @MaxLength(255)
  key!: string;
}

export class RegisterPaymentMethodDto {
  @ApiProperty({ description: 'ID do cliente' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ description: 'ID da assinatura' })
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty({ enum: PaymentMethodType, description: 'Tipo do metodo de pagamento' })
  @IsEnum(PaymentMethodType)
  type!: PaymentMethodType;

  @ApiProperty({ type: CardInfoDto, required: false, description: 'Dados do cartao (obrigatorio se type=CARD)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CardInfoDto)
  card?: CardInfoDto;

  @ApiProperty({ type: PixInfoDto, required: false, description: 'Dados do PIX (obrigatorio se type=PIX)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PixInfoDto)
  pix?: PixInfoDto;
}
