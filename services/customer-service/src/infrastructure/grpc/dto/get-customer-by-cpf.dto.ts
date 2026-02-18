import { IsString, MaxLength } from 'class-validator';

export class GetCustomerByCpfDto {
  @IsString()
  @MaxLength(14)
  cpf!: string;
}
