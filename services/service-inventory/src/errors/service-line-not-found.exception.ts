import { NotFoundException } from '@nestjs/common';

export class ServiceLineNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Service line not found: ${identifier}`);
  }
}
