import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { RequestSimSwapCommand } from '../../src/application/commands/request-sim-swap.command';
import { SimType, SimStatus, SwapType, SwapReason } from '../../src/domain/enums';

describe('RequestSimSwapCommand', () => {
  let command: RequestSimSwapCommand;
  let mockPrisma: any;
  let mockSimCardRepo: any;
  let mockSimSwapRequestRepo: any;
  let txOperations: any[];

  const oldSim = {
    id: '00000000-0000-0000-0000-000000000010',
    iccid: '8955100000000000001',
    imsi: '310410001',
    type: SimType.PHYSICAL,
    status: SimStatus.ACTIVATED,
    supplier: 'Supplier A',
    importBatchId: '00000000-0000-0000-0000-000000000099',
    allocatedToOrderId: '00000000-0000-0000-0000-000000000001',
    allocatedToCustomerId: '00000000-0000-0000-0000-000000000002',
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

  const newSim = {
    id: '00000000-0000-0000-0000-000000000020',
    iccid: '8955100000000000002',
    imsi: '310410002',
    type: SimType.PHYSICAL,
    status: SimStatus.AVAILABLE,
    supplier: 'Supplier A',
    importBatchId: '00000000-0000-0000-0000-000000000099',
    allocatedToOrderId: null,
    allocatedToCustomerId: null,
    formFactor: '2FF',
    pin: '5678',
    puk: '87654321',
    warehouseLocation: 'A1-02',
    eid: null,
    activationCode: null,
    qrCodeData: null,
    smdpAddress: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const swapInput = {
    customerId: '00000000-0000-0000-0000-000000000002',
    msisdn: '5511999999999',
    oldSimId: oldSim.id,
    newSimId: newSim.id,
    swapType: SwapType.PHYSICAL_TO_PHYSICAL,
    reason: SwapReason.LOST,
    orderId: '00000000-0000-0000-0000-000000000001',
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          simSwapRequest: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simSwapRequest.create', args });
              return { id: 'swap-id-001', ...args.data };
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
      findById: vi.fn().mockImplementation((id: string) => {
        if (id === oldSim.id) return Promise.resolve(oldSim);
        if (id === newSim.id) return Promise.resolve(newSim);
        return Promise.resolve(null);
      }),
    };

    mockSimSwapRequestRepo = {
      create: vi.fn(),
    };

    command = new RequestSimSwapCommand(mockPrisma, mockSimCardRepo, mockSimSwapRequestRepo);
  });

  it('deve criar swap request com sucesso', async () => {
    const result = await command.execute(swapInput);

    expect(result).toBeDefined();
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const swapCreate = txOperations.find((op) => op.type === 'simSwapRequest.create');
    expect(swapCreate).toBeDefined();
    expect(swapCreate.args.data.customerId).toBe(swapInput.customerId);
    expect(swapCreate.args.data.msisdn).toBe(swapInput.msisdn);
    expect(swapCreate.args.data.oldSimId).toBe(swapInput.oldSimId);
    expect(swapCreate.args.data.newSimId).toBe(swapInput.newSimId);
    expect(swapCreate.args.data.swapType).toBe(SwapType.PHYSICAL_TO_PHYSICAL);
    expect(swapCreate.args.data.reason).toBe(SwapReason.LOST);
  });

  it('deve emitir evento sim.swap.requested no outbox', async () => {
    await command.execute(swapInput);

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent).toBeDefined();
    expect(outboxEvent.args.data.eventType).toBe('sim.swap.requested');
    expect(outboxEvent.args.data.aggregateType).toBe('SimSwapRequest');
  });

  it('deve lancar NotFoundException quando oldSim nao existe', async () => {
    mockSimCardRepo.findById.mockImplementation((id: string) => {
      if (id === oldSim.id) return Promise.resolve(null);
      return Promise.resolve(newSim);
    });

    await expect(command.execute(swapInput)).rejects.toThrow(NotFoundException);
  });

  it('deve lancar NotFoundException quando newSim nao existe', async () => {
    mockSimCardRepo.findById.mockImplementation((id: string) => {
      if (id === newSim.id) return Promise.resolve(null);
      return Promise.resolve(oldSim);
    });

    await expect(command.execute(swapInput)).rejects.toThrow(NotFoundException);
  });

  it('deve lancar BadRequestException quando newSim nao esta disponivel', async () => {
    mockSimCardRepo.findById.mockImplementation((id: string) => {
      if (id === newSim.id) return Promise.resolve({ ...newSim, status: SimStatus.ACTIVATED });
      return Promise.resolve(oldSim);
    });

    await expect(command.execute(swapInput)).rejects.toThrow(BadRequestException);
  });

  it('deve aceitar newSim com status RESERVED', async () => {
    mockSimCardRepo.findById.mockImplementation((id: string) => {
      if (id === newSim.id) return Promise.resolve({ ...newSim, status: SimStatus.RESERVED });
      return Promise.resolve(oldSim);
    });

    const result = await command.execute(swapInput);
    expect(result).toBeDefined();
  });
});
