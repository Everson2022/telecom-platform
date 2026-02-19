import { ConflictException } from '@nestjs/common';

export class DuplicateLocalityException extends ConflictException {
  constructor(ibgeCode: string) {
    super(`Locality with IBGE code ${ibgeCode} already exists`);
  }
}
