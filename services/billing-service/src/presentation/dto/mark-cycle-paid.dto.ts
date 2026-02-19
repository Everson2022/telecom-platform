import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkCyclePaidDto {
  @ApiProperty()
  @IsUUID()
  paymentTransactionId!: string;
}
