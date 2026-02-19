import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { ReactivateLineCommand } from '../../src/application/commands/reactivate-line.command';
import { ActivationStatus } from '../../src/domain/enums';

describe('ReactivateLineCommand', () => {
  let command: ReactivateLineCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLineActivationRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockCoreClient: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const suspendedActivation = {
    id: '00000000-0000-0000-0000-000000000010',
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    iccid: '8955011000000000001',
    msisdn: '+5511900000001',
    imsi: '724011000000001',
    status: ActivationStatus.SUSPENDED,
    coreTransactionId: 'fake-core-12345',
    networkResponse: null,
    failureReason: null,
    retryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          lineActivation: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'lineActivation.update', args });
              return { ...suspendedActivation, ...args.data };
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

    mockLineActivationRepo = {
      findByMsisdn: vi.fn().mockResolvedValue(suspendedActivation),
    };

    mockCoreClient = {
      reactivateSubscriber: vi.fn().mockResolvedValue(undefined),
    };

    command = new ReactivateLineCommand(mockPrisma, mockLineActivationRepo, mockCoreClient);
  });

  it('deve reativar linha no CORE e atualizar status para ACTIVATED', async () => {
    await command.execute('+5511900000001');

    expect(mockCoreClient.reactivateSubscriber).toHaveBeenCalledWith('+5511900000001');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const update = txOperations.find((op) => op.type === 'lineActivation.update');
    expect(update.args.data.status).toBe(ActivationStatus.ACTIVATED);
  });

  it('deve gerar evento activation.line.reactivated no outbox', async () => {
    await command.execute('+5511900000001');

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent.args.data.eventType).toBe('activation.line.reactivated');
    expect(outboxEvent.args.data.payload.msisdn).toBe('+5511900000001');
  });

  it('deve rejeitar se linha nao encontrada', async () => {
    mockLineActivationRepo.findByMsisdn.mockResolvedValue(null);

    await expect(command.execute('+5500000000000')).rejects.toThrow(NotFoundException);
  });
});
