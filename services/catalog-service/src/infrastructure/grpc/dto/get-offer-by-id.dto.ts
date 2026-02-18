import { IsUUID } from 'class-validator';

export class GetOfferByIdDto {
  @IsUUID()
  offerId!: string;
}
