import { IsUUID } from 'class-validator';

export class CustomerDocumentParamDto {
  @IsUUID()
  customerId!: string;

  @IsUUID()
  documentId!: string;
}
