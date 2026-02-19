import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImportSimBatchCommand } from '../../src/application/commands/import-sim-batch.command';
import { SimType } from '../../src/domain/enums';

describe('ImportSimBatchCommand', () => {
  let command: ImportSimBatchCommand;
  let mockPrisma: any;
  let mockSimImportBatchRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          simImportBatch: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simImportBatch.create', args });
              return args.data;
            }),
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simImportBatch.update', args });
              return { ...args.data, id: args.where.id };
            }),
          },
          simCard: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simCard.create', args });
              return args.data;
            }),
          },
          simImportError: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'simImportError.create', args });
              return args.data;
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

    mockSimImportBatchRepo = {
      findById: vi.fn().mockResolvedValue({
        id: 'batch-id',
        supplier: 'Supplier A',
        fileName: 'sims.csv',
        simType: SimType.PHYSICAL,
        totalRecords: 2,
        successCount: 2,
        errorCount: 0,
        status: 'COMPLETED',
        errors: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    command = new ImportSimBatchCommand(mockPrisma, mockSimImportBatchRepo);
  });

  const physicalCsv = `iccid,imsi,form_factor,pin,puk,warehouse_location
8955100000000000001,310410001,2FF,1234,12345678,A1-01
8955100000000000002,310410002,2FF,5678,87654321,A1-02`;

  const esimCsv = `iccid,imsi,eid,activation_code,smdp_address
8955200000000000001,310420001,89001012012341234012,LPA:1$smdp.example.com$matchingID,smdp.example.com
8955200000000000002,310420002,89001012012341234013,LPA:1$smdp.example.com$matchingID2,smdp.example.com`;

  it('deve importar SIMs PHYSICAL com sucesso', async () => {
    const result = await command.execute({
      csvContent: physicalCsv,
      supplier: 'Supplier A',
      fileName: 'physical-sims.csv',
      simType: SimType.PHYSICAL,
    });

    expect(result).toBeDefined();
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const batchCreate = txOperations.find((op) => op.type === 'simImportBatch.create');
    expect(batchCreate).toBeDefined();
    expect(batchCreate.args.data.simType).toBe(SimType.PHYSICAL);
    expect(batchCreate.args.data.status).toBe('PROCESSING');

    const simCreates = txOperations.filter((op) => op.type === 'simCard.create');
    expect(simCreates).toHaveLength(2);
    expect(simCreates[0].args.data.iccid).toBe('8955100000000000001');
    expect(simCreates[0].args.data.type).toBe(SimType.PHYSICAL);
  });

  it('deve importar SIMs ESIM com sucesso', async () => {
    await command.execute({
      csvContent: esimCsv,
      supplier: 'Supplier B',
      fileName: 'esims.csv',
      simType: SimType.ESIM,
    });

    const simCreates = txOperations.filter((op) => op.type === 'simCard.create');
    expect(simCreates).toHaveLength(2);
    expect(simCreates[0].args.data.iccid).toBe('8955200000000000001');
    expect(simCreates[0].args.data.type).toBe(SimType.ESIM);
    expect(simCreates[0].args.data.eid).toBe('89001012012341234012');
  });

  it('deve gerar SimImportError para linhas invalidas', async () => {
    const csvWithInvalidLine = `iccid,imsi,form_factor,pin,puk,warehouse_location
8955100000000000001,310410001,2FF,1234,12345678,A1-01
,invalid-line-missing-iccid`;

    // Override simCard.create to throw on second call
    let simCardCreateCallCount = 0;
    mockPrisma.$transaction = vi.fn(async (fn: any) => {
      const tx = {
        simImportBatch: {
          create: vi.fn(async (args: any) => {
            txOperations.push({ type: 'simImportBatch.create', args });
            return args.data;
          }),
          update: vi.fn(async (args: any) => {
            txOperations.push({ type: 'simImportBatch.update', args });
            return { ...args.data, id: args.where.id };
          }),
        },
        simCard: {
          create: vi.fn(async (args: any) => {
            simCardCreateCallCount++;
            if (simCardCreateCallCount > 1) {
              throw new Error('Invalid PHYSICAL SIM row: missing required columns');
            }
            txOperations.push({ type: 'simCard.create', args });
            return args.data;
          }),
        },
        simImportError: {
          create: vi.fn(async (args: any) => {
            txOperations.push({ type: 'simImportError.create', args });
            return args.data;
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
    });

    await command.execute({
      csvContent: csvWithInvalidLine,
      supplier: 'Supplier A',
      fileName: 'mixed.csv',
      simType: SimType.PHYSICAL,
    });

    const errors = txOperations.filter((op) => op.type === 'simImportError.create');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve emitir evento sim.batch.imported no outbox', async () => {
    await command.execute({
      csvContent: physicalCsv,
      supplier: 'Supplier A',
      fileName: 'sims.csv',
      simType: SimType.PHYSICAL,
    });

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent).toBeDefined();
    expect(outboxEvent.args.data.eventType).toBe('sim.batch.imported');
    expect(outboxEvent.args.data.aggregateType).toBe('SimImportBatch');
  });

  it('deve atualizar batch com successCount e errorCount ao final', async () => {
    await command.execute({
      csvContent: physicalCsv,
      supplier: 'Supplier A',
      fileName: 'sims.csv',
      simType: SimType.PHYSICAL,
    });

    const batchUpdate = txOperations.find((op) => op.type === 'simImportBatch.update');
    expect(batchUpdate).toBeDefined();
    expect(batchUpdate.args.data.successCount).toBe(2);
    expect(batchUpdate.args.data.errorCount).toBe(0);
    expect(batchUpdate.args.data.status).toBe('COMPLETED');
  });
});
