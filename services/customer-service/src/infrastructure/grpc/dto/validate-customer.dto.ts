import { IsUUID } from 'class-validator';

export class ValidateCustomerDto {
  @IsUUID()
  customerId!: string;
}
