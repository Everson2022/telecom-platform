import { IsUUID } from 'class-validator';

export class GetCustomerByIdDto {
  @IsUUID()
  customerId!: string;
}
