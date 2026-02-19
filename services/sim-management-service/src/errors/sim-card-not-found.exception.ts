import { NotFoundException } from '@nestjs/common';

export class SimCardNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`SIM card ${id} not found`);
  }
}
