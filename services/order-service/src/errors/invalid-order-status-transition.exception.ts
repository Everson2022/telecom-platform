import { BadRequestException } from '@nestjs/common';

export class InvalidOrderStatusTransitionException extends BadRequestException {
  constructor(from: string, to: string) {
    super(`Cannot transition order from ${from} to ${to}`);
  }
}
