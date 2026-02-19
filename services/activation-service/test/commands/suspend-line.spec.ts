import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { SuspendLineCommand } from '../../src/application/commands/suspend-line.command';
import { ActivationStatus } from '../../src/domain/enums';

describe('SuspendLineCommand', () => {
  let command: SuspendLineCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLineActivationRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockCoreClient: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const activeActivation = {
    id: '00000000-0000-0000-0000-000000000010',
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    iccid: '8955011000000000001',
    msisdn: '+5511900000001',
    imsi: '724011000000001',
    status: ActivationStatus.ACTIVATED,
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
              return { ...activeActivation, ...args.data };
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
      findByMsisdn: vi.fn().mockResolvedValue(activeActivation),
    };

    mockCoreClient = {
      suspendSubscriber: vi.fn().mockResolvedValue(undefined),
    };

    command = new SuspendLineCommand(mockPrisma, mockLineActivationRepo, mockCoreClient);
  });

  it('deve suspender linha no CORE e atualizar status', async () => {
    await command.execute({ msisdn: '+5511900000001' });

    expect(mockCoreClient.suspendSubscriber).toHaveBeenCalledWith('+5511900000001');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const update = txOperations.find((op) => op.type === 'lineActivation.update');
    expect(update.args.data.status).toBe(ActivationStatus.SUSPENDED);
  });

  it('deve gerar evento activation.line.suspended no outbox', async () => {
    await command.execute({ msisdn: '+5511900000001', reason: 'payment_overdue' });

    const outboxEvent = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxEvent.args.data.eventType).toBe('activation.line.suspended');
    expect(outboxEvent.args.data.payload.reason).toBe('payment_overdue');
  });

  it('deve rejeitar se linha nao encontrada', async () => {
    mockLineActivationRepo.findByMsisdn.mockResolvedValue(null);

    await expect(command.execute({ msisdn: '+5500000000000' })).rejects.toThrow(NotFoundException);
  });
});
