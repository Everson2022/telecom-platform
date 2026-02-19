import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AllocateSimCommand } from '../../src/application/commands/allocate-sim.command';
import { SimType, SimStatus } from '../../src/domain/enums';

describe('AllocateSimCommand', () => {
  let command: AllocateSimCommand;
  let mockPrisma: any;
  let mockSimCardRepo: any;
  let txOperations: any[];

  const availableSim = {
    id: '00000000-0000-0000-0000-000000000010',
    iccid: '8955100000000000001',
    imsi: '310410001',
    type: SimType.PHYSICAL,
    status: SimStatus.AVAILABLE,
    supplier: 'Supplier A',
    importBatchId: '00000000-0000-0000-0000-000000000099',
    allocatedToOrderId: null,
    allocatedToCustomerId: null,
    formFactor: '2FF',
    pin: '1234',
    puk: '12345678',
    warehouseLocation: 'A1-01',
    eid: null,
    activationCode: null,
    qrCodeData: null,
    smdpAddress: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const allocateInput = {
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    simType: SimType.PHYSICAL,
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          simCard: {
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simCard.update', args });
              return { ...availableSim, ...args.data };
            }),
          },
          outboxEvent: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'outboxEvent.create', args });
              return args.data;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockSimCardRepo = {
      findFirstAvailable: vi.fn().mockResolvedValue(availableSim),
    };

    command = new AllocateSimCommand(mockPrisma, mockSimCardRepo);
  });

  it('deve alocar SIM disponivel com sucesso', async () => {
    const result = await command.execute(allocateInput);

    expect(result).toBeDefined();
    expect(mockSimCardRepo.findFirstAvailable).toHaveBeenCalledWith(SimType.PHYSICAL);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const simUpdate = txOperations.find((op) => op.type === 'simCard.update');
    expect(simUpdate).toBeDefined();
    expect(simUpdate.args.data.status).toBe(SimStatus.ALLOCATED);
    expect(simUpdate.args.data.allocatedToOrderId).toBe(allocateInput.orderId);
    expect(simUpdate.args.data.allocatedToCustomerId).toBe(allocateInput.customerId);
  });

  it('deve emitir evento sim.allocated no outbox', async () => {
    await command.execute(allocateInput);

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent).toBeDefined();
    expect(outboxEvent.args.data.eventType).toBe('sim.allocated');
    expect(outboxEvent.args.data.aggregateType).toBe('SimCard');
  });

  it('deve retornar null e emitir sim.allocation-failed quando nao ha SIM disponivel', async () => {
    mockSimCardRepo.findFirstAvailable.mockResolvedValue(null);

    // Override transaction for failure case
    txOperations = [];
    mockPrisma.$transaction = vi.fn(async (fn: any) => {
      const tx = {
        outboxEvent: {
          create: vi.fn(async (args: any) => {
            txOperations.push({ type: 'outboxEvent.create', args });
            return args.data;
          }),
        },
      };
      return fn(tx);
    });

    const result = await command.execute(allocateInput);

    expect(result).toBeNull();
    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent).toBeDefined();
    expect(outboxEvent.args.data.eventType).toBe('sim.allocation-failed');
  });

  it('deve buscar SIM do tipo correto', async () => {
    const esimInput = { ...allocateInput, simType: SimType.ESIM };
    mockSimCardRepo.findFirstAvailable.mockResolvedValue({
      ...availableSim,
      type: SimType.ESIM,
    });

    await command.execute(esimInput);

    expect(mockSimCardRepo.findFirstAvailable).toHaveBeenCalledWith(SimType.ESIM);
  });

  it('deve incluir informacoes corretas no payload do evento', async () => {
    await command.execute(allocateInput);

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent.args.data.payload.orderId).toBe(allocateInput.orderId);
    expect(outboxEvent.args.data.payload.customerId).toBe(allocateInput.customerId);
    expect(outboxEvent.args.data.payload.simType).toBe(SimType.PHYSICAL);
  });
});
