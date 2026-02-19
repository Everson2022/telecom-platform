import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { UpdateShipmentStatusCommand } from '../../src/application/commands/update-shipment-status.command';
import { ShipmentStatus } from '../../src/domain/enums';

describe('UpdateShipmentStatusCommand', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let command: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockShipmentRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

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
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          shipment: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'shipment.update', args });
              return { ...existingShipment, ...args.data };
            }),
          },
          shipmentStatusHistory: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'shipmentStatusHistory.create', args });
              return { id: '00000000-0000-0000-0000-000000000099', ...args.data };
            }),
          },
          outboxEvent: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'outboxEvent.create', args });
              return args.data;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockShipmentRepo = {
      findById: vi.fn().mockResolvedValue(existingShipment),
    };

    command = new UpdateShipmentStatusCommand(mockPrisma, mockShipmentRepo);
  });

  it('deve atualizar status para IN_TRANSIT e emitir evento', async () => {
    const result = await command.execute({
      shipmentId: existingShipment.id,
      status: ShipmentStatus.IN_TRANSIT,
      notes: 'Em transito pela transportadora',
    });

    expect(result).toBeDefined();
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const shipmentUpdate = txOperations.find((op) => op.type === 'shipment.update');
    expect(shipmentUpdate.args.data.status).toBe(ShipmentStatus.IN_TRANSIT);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);
    expect(outboxEvents[0].args.data.eventType).toBe('logistics.shipment.in-transit');
  });

  it('deve atualizar status para DELIVERED, setar actualDeliveryDate e emitir evento', async () => {
    const result = await command.execute({
      shipmentId: existingShipment.id,
      status: ShipmentStatus.DELIVERED,
    });

    expect(result).toBeDefined();

    const shipmentUpdate = txOperations.find((op) => op.type === 'shipment.update');
    expect(shipmentUpdate.args.data.status).toBe(ShipmentStatus.DELIVERED);
    expect(shipmentUpdate.args.data.actualDeliveryDate).toBeDefined();
    expect(shipmentUpdate.args.data.actualDeliveryDate).toBeInstanceOf(Date);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);
    expect(outboxEvents[0].args.data.eventType).toBe('logistics.shipment.delivered');
    expect(outboxEvents[0].args.data.payload.actualDeliveryDate).toBeDefined();
  });

  it('deve atualizar status para RETURNED e emitir evento', async () => {
    await command.execute({
      shipmentId: existingShipment.id,
      status: ShipmentStatus.RETURNED,
      notes: 'Destinatario ausente',
    });

    const shipmentUpdate = txOperations.find((op) => op.type === 'shipment.update');
    expect(shipmentUpdate.args.data.status).toBe(ShipmentStatus.RETURNED);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents[0].args.data.eventType).toBe('logistics.shipment.returned');
  });

  it('deve lancar ShipmentNotFoundException para shipment inexistente', async () => {
    mockShipmentRepo.findById.mockResolvedValue(null);

    await expect(
      command.execute({ shipmentId: 'non-existent-id', status: ShipmentStatus.IN_TRANSIT }),
    ).rejects.toThrow(NotFoundException);
  });
});
