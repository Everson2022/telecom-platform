import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { DeallocateSimCommand } from '../../src/application/commands/deallocate-sim.command';
import { SimStatus, SimType } from '../../src/domain/enums';

describe('DeallocateSimCommand', () => {
  let command: DeallocateSimCommand;
  let mockPrisma: any;
  let mockSimCardRepo: any;
  let txOperations: any[];

  const allocatedSim = {
    id: '00000000-0000-0000-0000-000000000010',
    iccid: '8955100000000000001',
    imsi: '310410001',
    type: SimType.PHYSICAL,
    status: SimStatus.ALLOCATED,
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

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          simCard: {
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simCard.update', args });
              return { ...allocatedSim, ...args.data };
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
      findById: vi.fn().mockResolvedValue(allocatedSim),
    };

    command = new DeallocateSimCommand(mockPrisma, mockSimCardRepo);
  });

  it('deve liberar SIM de volta para AVAILABLE com sucesso', async () => {
    const result = await command.execute(allocatedSim.id);

    expect(result).toBeDefined();
    expect(mockSimCardRepo.findById).toHaveBeenCalledWith(allocatedSim.id);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const simUpdate = txOperations.find((op) => op.type === 'simCard.update');
    expect(simUpdate).toBeDefined();
    expect(simUpdate.args.data.status).toBe(SimStatus.AVAILABLE);
    expect(simUpdate.args.data.allocatedToOrderId).toBeNull();
    expect(simUpdate.args.data.allocatedToCustomerId).toBeNull();
  });

  it('deve emitir evento sim.deallocated no outbox', async () => {
    await command.execute(allocatedSim.id);

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent).toBeDefined();
    expect(outboxEvent.args.data.eventType).toBe('sim.deallocated');
    expect(outboxEvent.args.data.aggregateType).toBe('SimCard');
  });

  it('deve lancar NotFoundException quando SIM nao existe', async () => {
    mockSimCardRepo.findById.mockResolvedValue(null);

    await expect(command.execute('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('deve incluir iccid correto no payload do evento', async () => {
    await command.execute(allocatedSim.id);

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent.args.data.payload.iccid).toBe(allocatedSim.iccid);
    expect(outboxEvent.args.data.payload.simCardId).toBe(allocatedSim.id);
  });

  it('deve limpar campos de alocacao ao desalocar', async () => {
    await command.execute(allocatedSim.id);

    const simUpdate = txOperations.find((op) => op.type === 'simCard.update');
    expect(simUpdate.args.where.id).toBe(allocatedSim.id);
    expect(simUpdate.args.data.allocatedToOrderId).toBeNull();
    expect(simUpdate.args.data.allocatedToCustomerId).toBeNull();
  });
});
