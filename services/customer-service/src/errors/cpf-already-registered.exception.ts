import { ConflictException } from '@nestjs/common';

export class CpfAlreadyRegisteredException extends ConflictException {
  constructor() {
    super('CPF already registered');
  }
}
