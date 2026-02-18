import { BadRequestException } from '@nestjs/common';

export class InvalidMaxLinesException extends BadRequestException {
  constructor(type: string, expected: number) {
    super(`Plan type ${type} must have maxLines = ${expected}`);
  }
}
