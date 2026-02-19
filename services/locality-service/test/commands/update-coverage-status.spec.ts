import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateCoverageStatusCommand } from '../../src/application/commands/update-coverage-status.command';
import { LocalityNotFoundException } from '../../src/errors';

describe('UpdateCoverageStatusCommand', () => {
  let command: UpdateCoverageStatusCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLocalityRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const existingLocality = {
    id: '00000000-0000-0000-0000-000000000010',
    dddCode: '11',
    city: 'Sao Paulo',
    state: 'SP',
    region: 'Sudeste',
    ibgeCode: '3550308',
    hasCoverage: false,
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
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'locality.update', args });
              return { ...existingLocality, ...args.data };
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
      findById: vi.fn().mockResolvedValue(existingLocality),
    };

    command = new UpdateCoverageStatusCommand(mockPrisma, mockLocalityRepo);
  });

  it('deve atualizar hasCoverage para true e emitir evento', async () => {
    const result = await command.execute({ localityId: existingLocality.id, hasCoverage: true });

    expect(result.hasCoverage).toBe(true);

    const localityUpdate = txOperations.find((op) => op.type === 'locality.update');
    expect(localityUpdate.args.data.hasCoverage).toBe(true);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const coverageEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'locality.coverage.updated',
    );
    expect(coverageEvent).toBeDefined();
    expect(coverageEvent.args.data.payload.hasCoverage).toBe(true);
  });

  it('deve atualizar hasCoverage para false', async () => {
    mockLocalityRepo.findById.mockResolvedValue({ ...existingLocality, hasCoverage: true });

    const result = await command.execute({ localityId: existingLocality.id, hasCoverage: false });

    expect(result.hasCoverage).toBe(false);

    const localityUpdate = txOperations.find((op) => op.type === 'locality.update');
    expect(localityUpdate.args.data.hasCoverage).toBe(false);
  });

  it('deve lancar LocalityNotFoundException para localidade inexistente', async () => {
    mockLocalityRepo.findById.mockResolvedValue(null);

    await expect(
      command.execute({ localityId: 'invalid-id', hasCoverage: true }),
    ).rejects.toThrow(LocalityNotFoundException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
