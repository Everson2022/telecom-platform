import { NotFoundException } from '@nestjs/common';

export class SimSwapRequestNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`SIM swap request ${id} not found`);
  }
}
