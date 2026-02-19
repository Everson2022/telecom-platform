import { NotFoundException } from '@nestjs/common';

export class FamilyGroupNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Family group not found: ${identifier}`);
  }
}
