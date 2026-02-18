import { IsUUID, IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class GetOfferPriceByLocalityDto {
  @IsUUID()
  offerId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(3)
  dddCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;
}
