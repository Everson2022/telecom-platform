import { BadRequestException } from '@nestjs/common';

export class CustomerRequiresDocumentException extends BadRequestException {
  constructor() {
    super('At least one document is required');
  }
}
