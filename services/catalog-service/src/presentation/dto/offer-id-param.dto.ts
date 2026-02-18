import { IsUUID } from 'class-validator';

export class OfferIdParamDto {
  @IsUUID()
  offerId!: string;
}
