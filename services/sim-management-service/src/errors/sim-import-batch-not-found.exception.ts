import { NotFoundException } from '@nestjs/common';

export class SimImportBatchNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`SIM import batch ${id} not found`);
  }
}
