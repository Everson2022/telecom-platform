import { NotFoundException } from '@nestjs/common';

export class DocumentNotFoundException extends NotFoundException {
  constructor(documentId: string, customerId: string) {
    super(`Document ${documentId} not found for customer ${customerId}`);
  }
}
