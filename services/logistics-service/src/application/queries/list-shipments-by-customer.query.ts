import { Injectable } from '@nestjs/common';
import { ShipmentRepository } from '../../infrastructure/database/repositories/shipment.repository';
import { ShipmentRecord } from '../../domain/types';

@Injectable()
export class ListShipmentsByCustomerQuery {
  constructor(private readonly shipmentRepo: ShipmentRepository) {}

  async execute(customerId: string): Promise<ShipmentRecord[]> {
    return this.shipmentRepo.findByCustomerId(customerId);
  }
}
