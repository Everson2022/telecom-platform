import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { GetShipmentByOrderIdQuery } from '../../src/application/queries/get-shipment-by-order-id.query';
import { ShipmentStatus } from '../../src/domain/enums';

describe('GetShipmentByOrderIdQuery', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockShipmentRepo: any;

  const existingShipment = {
    id: '00000000-0000-0000-0000-000000000010',
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    simId: null,
    iccid: '8955011000000000001',
    carrier: 'FakeCarrier',
    trackingCode: 'FAKE-ABCD1234',
    status: ShipmentStatus.DISPATCHED,
    addressZipCode: '01310-100',
    addressStreet: 'Avenida Paulista',
    addressNumber: '1000',
    addressComplement: null,
    addressNeighborhood: 'Bela Vista',
    addressCity: 'Sao Paulo',
    addressState: 'SP',
    estimatedDeliveryDate: new Date(),
    actualDeliveryDate: null,
    failureReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    statusHistory: [],
  };

  beforeEach(() => {
    mockShipmentRepo = {
      findByOrderId: vi.fn().mockResolvedValue(existingShipment),
    };

    query = new GetShipmentByOrderIdQuery(mockShipmentRepo);
  });

  it('deve retornar shipment por orderId', async () => {
    const result = await query.execute(existingShipment.orderId);

    expect(result).toBeDefined();
    expect(result.id).toBe(existingShipment.id);
    expect(result.orderId).toBe(existingShipment.orderId);
    expect(mockShipmentRepo.findByOrderId).toHaveBeenCalledWith(existingShipment.orderId);
  });

  it('deve lancar ShipmentNotFoundException para orderId inexistente', async () => {
    mockShipmentRepo.findByOrderId.mockResolvedValue(null);

    await expect(query.execute('non-existent-order-id')).rejects.toThrow(NotFoundException);
  });
});
