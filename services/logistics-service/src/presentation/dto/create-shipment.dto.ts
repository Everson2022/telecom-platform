import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty() @IsUUID() orderId!: string;
  @ApiProperty() @IsUUID() customerId!: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() simId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() iccid!: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressZipCode!: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressStreet!: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressNumber!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() addressComplement?: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressNeighborhood!: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressCity!: string;
  @ApiProperty() @IsString() @IsNotEmpty() addressState!: string;
}
