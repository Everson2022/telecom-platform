import { NotFoundException } from '@nestjs/common';

export class LineActivationNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Line activation not found: ${identifier}`);
  }
}
