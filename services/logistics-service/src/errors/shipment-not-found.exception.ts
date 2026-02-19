import { NotFoundException } from '@nestjs/common';

export class ShipmentNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Shipment not found: ${identifier}`);
  }
}
