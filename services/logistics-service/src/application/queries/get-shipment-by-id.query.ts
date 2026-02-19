import { Injectable } from '@nestjs/common';
import { ShipmentRepository } from '../../infrastructure/database/repositories/shipment.repository';
import { ShipmentWithHistory } from '../../domain/types';
import { ShipmentNotFoundException } from '../../errors';

@Injectable()
export class GetShipmentByIdQuery {
  constructor(private readonly shipmentRepo: ShipmentRepository) {}

  async execute(id: string): Promise<ShipmentWithHistory> {
    const shipment = await this.shipmentRepo.findById(id);
    if (!shipment) {
      throw new ShipmentNotFoundException(id);
    }
    return shipment;
  }
}
