import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateLocalityCommand } from '../../src/application/commands/create-locality.command';
import { DuplicateLocalityException } from '../../src/errors';

describe('CreateLocalityCommand', () => {
  let command: CreateLocalityCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLocalityRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const validInput = {
    dddCode: '11',
    city: 'Sao Paulo',
    state: 'SP',
    region: 'Sudeste',
    ibgeCode: '3550308',
    hasCoverage: true,
  };

  const createdLocality = {
    id: '00000000-0000-0000-0000-000000000010',
    dddCode: '11',
    city: 'Sao Paulo',
    state: 'SP',
    region: 'Sudeste',
    ibgeCode: '3550308',
    hasCoverage: true,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          locality: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'locality.create', args });
              return createdLocality;
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

    mockLocalityRepo = {
      findByIbgeCode: vi.fn().mockResolvedValue(null),
    };

    command = new CreateLocalityCommand(mockPrisma, mockLocalityRepo);
  });

  it('deve criar localidade com status ACTIVE e emitir evento no outbox', async () => {
    const result = await command.execute(validInput);

    expect(result.dddCode).toBe(validInput.dddCode);
    expect(result.city).toBe(validInput.city);
    expect(result.status).toBe('ACTIVE');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const localityCreate = txOperations.find((op) => op.type === 'locality.create');
    expect(localityCreate.args.data.ibgeCode).toBe(validInput.ibgeCode);
    expect(localityCreate.args.data.hasCoverage).toBe(true);
  });

  it('deve emitir evento locality.created no outbox', async () => {
    await command.execute(validInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const createdEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'locality.created',
    );
    expect(createdEvent).toBeDefined();
    expect(createdEvent.args.data.payload.dddCode).toBe(validInput.dddCode);
    expect(createdEvent.args.data.payload.ibgeCode).toBe(validInput.ibgeCode);
  });

  it('deve lancar DuplicateLocalityException para ibgeCode duplicado', async () => {
    mockLocalityRepo.findByIbgeCode.mockResolvedValue(createdLocality);

    await expect(command.execute(validInput)).rejects.toThrow(DuplicateLocalityException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
