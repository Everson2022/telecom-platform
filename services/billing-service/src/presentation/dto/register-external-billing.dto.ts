import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterExternalBillingDto {
  @ApiProperty()
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  externalSystemId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  externalAccountId!: string;
}
