import { IsUUID } from 'class-validator';

export class GetOrderByIdDto {
  @IsUUID()
  orderId!: string;
}
