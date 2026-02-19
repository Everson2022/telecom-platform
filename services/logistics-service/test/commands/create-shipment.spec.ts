import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateShipmentCommand } from '../../src/application/commands/create-shipment.command';
import { ShipmentStatus } from '../../src/domain/enums';

describe('CreateShipmentCommand', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let command: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockShipmentRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockCarrierClient: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const validInput = {
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    simId: '00000000-0000-0000-0000-000000000003',
    iccid: '8955011000000000001',
    address: {
      zipCode: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apto 10',
      neighborhood: 'Bela Vista',
      city: 'Sao Paulo',
      state: 'SP',
    },
  };

  const createdShipment = {
    id: '00000000-0000-0000-0000-000000000010',
    orderId: validInput.orderId,
    customerId: validInput.customerId,
    simId: validInput.simId,
    iccid: validInput.iccid,
    carrier: 'FakeCarrier',
    trackingCode: 'FAKE-ABCD1234',
    status: ShipmentStatus.DISPATCHED,
    addressZipCode: validInput.address.zipCode,
    addressStreet: validInput.address.street,
    addressNumber: validInput.address.number,
    addressComplement: validInput.address.complement,
    addressNeighborhood: validInput.address.neighborhood,
    addressCity: validInput.address.city,
    addressState: validInput.address.state,
    estimatedDeliveryDate: new Date(),
    actualDeliveryDate: null,
    failureReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    statusHistory: [
      {
        id: '00000000-0000-0000-0000-000000000020',
        shipmentId: '00000000-0000-0000-0000-000000000010',
        status: ShipmentStatus.PENDING,
        notes: 'Shipment created',
        recordedAt: new Date(),
      },
      {
        id: '00000000-0000-0000-0000-000000000021',
        shipmentId: '00000000-0000-0000-0000-000000000010',
        status: ShipmentStatus.DISPATCHED,
        notes: 'Dispatched by carrier with tracking code FAKE-ABCD1234',
        recordedAt: new Date(),
      },
    ],
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          shipment: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'shipment.create', args });
              return { ...createdShipment, ...args.data, id: createdShipment.id };
            }),
          },
          shipmentStatusHistory: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'shipmentStatusHistory.create', args });
              return { id: '00000000-0000-0000-0000-000000000020', ...args.data };
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
      findByOrderId: vi.fn().mockResolvedValue(null),
      findById: vi.fn().mockResolvedValue(createdShipment),
    };

    mockCarrierClient = {
      dispatchShipment: vi.fn().mockResolvedValue({
        trackingCode: 'FAKE-ABCD1234',
        estimatedDeliveryDays: 5,
      }),
    };

    command = new CreateShipmentCommand(mockPrisma, mockShipmentRepo, mockCarrierClient);
  });

  it('deve criar shipment com status DISPATCHED e trackingCode gerado pela transportadora', async () => {
    const result = await command.execute(validInput);

    expect(result).toBeDefined();
    expect(mockCarrierClient.dispatchShipment).toHaveBeenCalledWith(validInput.iccid, validInput.address);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const shipmentCreate = txOperations.find((op) => op.type === 'shipment.create');
    expect(shipmentCreate).toBeDefined();
    expect(shipmentCreate.args.data.status).toBe(ShipmentStatus.DISPATCHED);
    expect(shipmentCreate.args.data.trackingCode).toBe('FAKE-ABCD1234');
    expect(shipmentCreate.args.data.carrier).toBe('FakeCarrier');
  });

  it('deve ser idempotente — retorna shipment existente para orderId duplicado', async () => {
    mockShipmentRepo.findByOrderId.mockResolvedValue(createdShipment);

    const result = await command.execute(validInput);

    expect(result.id).toBe(createdShipment.id);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    expect(mockCarrierClient.dispatchShipment).not.toHaveBeenCalled();
  });

  it('deve emitir eventos logistics.shipment.created e logistics.shipment.dispatched no outbox', async () => {
    await command.execute(validInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(2);

    const createdEvent = outboxEvents.find((op) => op.args.data.eventType === 'logistics.shipment.created');
    expect(createdEvent).toBeDefined();
    expect(createdEvent.args.data.aggregateType).toBe('Shipment');

    const dispatchedEvent = outboxEvents.find((op) => op.args.data.eventType === 'logistics.shipment.dispatched');
    expect(dispatchedEvent).toBeDefined();
    expect(dispatchedEvent.args.data.aggregateType).toBe('Shipment');
  });

  it('deve criar historico de status (PENDING e DISPATCHED)', async () => {
    await command.execute(validInput);

    const historyCreates = txOperations.filter((op) => op.type === 'shipmentStatusHistory.create');
    expect(historyCreates).toHaveLength(2);

    const pendingHistory = historyCreates.find((op) => op.args.data.status === ShipmentStatus.PENDING);
    expect(pendingHistory).toBeDefined();

    const dispatchedHistory = historyCreates.find((op) => op.args.data.status === ShipmentStatus.DISPATCHED);
    expect(dispatchedHistory).toBeDefined();
  });
});
