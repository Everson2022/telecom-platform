import { BadRequestException } from '@nestjs/common';

export class InvalidStatusTransitionException extends BadRequestException {
  constructor(from: string, to: string) {
    super(`Cannot transition from ${from} to ${to}`);
  }
}
