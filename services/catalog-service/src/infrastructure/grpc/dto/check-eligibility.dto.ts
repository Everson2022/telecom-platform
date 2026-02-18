import { IsUUID } from 'class-validator';

export class CheckEligibilityDto {
  @IsUUID()
  offerId!: string;

  @IsUUID()
  customerId!: string;
}
