import { ApiProperty } from '@nestjs/swagger';

export class DocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() number!: string;
  @ApiProperty() issuingAuthority!: string;
  @ApiProperty() issueDate!: string;
  @ApiProperty({ required: false }) expirationDate?: string;
  @ApiProperty() verified!: boolean;
}

export class AddressResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() zipCode!: string;
  @ApiProperty() street!: string;
  @ApiProperty() number!: string;
  @ApiProperty({ required: false }) complement?: string;
  @ApiProperty() neighborhood!: string;
  @ApiProperty() city!: string;
  @ApiProperty() state!: string;
  @ApiProperty() dddCode!: string;
  @ApiProperty() country!: string;
  @ApiProperty() isDefault!: boolean;
}

export class CustomerResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() fullName!: string;
  @ApiProperty() cpf!: string;
  @ApiProperty() birthDate!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty({ enum: ['ACTIVE', 'SUSPENDED', 'CANCELLED'] }) status!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
  @ApiProperty({ type: [DocumentResponseDto] }) documents!: DocumentResponseDto[];
  @ApiProperty({ type: [AddressResponseDto] }) addresses!: AddressResponseDto[];
}

export class PaginationDto {
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
  @ApiProperty() totalItems!: number;
  @ApiProperty() totalPages!: number;
}

export class CustomerListResponseDto {
  @ApiProperty({ type: [CustomerResponseDto] }) data!: CustomerResponseDto[];
  @ApiProperty({ type: PaginationDto }) pagination!: PaginationDto;
}
