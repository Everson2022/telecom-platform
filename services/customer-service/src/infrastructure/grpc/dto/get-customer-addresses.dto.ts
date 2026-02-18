import { IsUUID } from 'class-validator';

export class GetCustomerAddressesDto {
  @IsUUID()
  customerId!: string;
}
