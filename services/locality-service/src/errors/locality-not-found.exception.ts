import { NotFoundException } from '@nestjs/common';

export class LocalityNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Locality not found: ${identifier}`);
  }
}
