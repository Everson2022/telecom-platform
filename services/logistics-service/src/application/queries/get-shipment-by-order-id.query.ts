import { Injectable } from '@nestjs/common';
import { ShipmentRepository } from '../../infrastructure/database/repositories/shipment.repository';
import { ShipmentWithHistory } from '../../domain/types';
import { ShipmentNotFoundException } from '../../errors';

@Injectable()
export class GetShipmentByOrderIdQuery {
  constructor(private readonly shipmentRepo: ShipmentRepository) {}

  async execute(orderId: string): Promise<ShipmentWithHistory> {
    const shipment = await this.shipmentRepo.findByOrderId(orderId);
    if (!shipment) {
      throw new ShipmentNotFoundException(orderId);
    }
    return shipment;
  }
}
