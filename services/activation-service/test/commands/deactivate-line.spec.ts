import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { DeactivateLineCommand } from '../../src/application/commands/deactivate-line.command';
import { ActivationStatus, MsisdnStatus } from '../../src/domain/enums';

describe('DeactivateLineCommand', () => {
  let command: DeactivateLineCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLineActivationRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockMsisdnPoolRepo: any;
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

  const msisdnRecord = {
    id: '00000000-0000-0000-0000-000000000030',
    msisdn: '+5511900000001',
    dddCode: '11',
    status: MsisdnStatus.ACTIVE,
    reservedForOrderId: activeActivation.orderId,
    assignedToCustomerId: activeActivation.customerId,
    quarantineUntil: null,
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
          msisdnPool: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'msisdnPool.update', args });
              return { ...msisdnRecord, ...args.data };
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
      findByOrderId: vi.fn().mockResolvedValue(activeActivation),
    };

    mockMsisdnPoolRepo = {
      findByMsisdn: vi.fn().mockResolvedValue(msisdnRecord),
    };

    mockCoreClient = {
      deactivateSubscriber: vi.fn().mockResolvedValue(undefined),
    };

    command = new DeactivateLineCommand(mockPrisma, mockLineActivationRepo, mockMsisdnPoolRepo, mockCoreClient);
  });

  it('deve desativar linha no CORE e colocar MSISDN em quarentena', async () => {
    await command.execute(activeActivation.orderId);

    expect(mockCoreClient.deactivateSubscriber).toHaveBeenCalledWith('+5511900000001');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const activationUpdate = txOperations.find((op) => op.type === 'lineActivation.update');
    expect(activationUpdate.args.data.status).toBe(ActivationStatus.DEACTIVATED);

    const msisdnUpdate = txOperations.find((op) => op.type === 'msisdnPool.update');
    expect(msisdnUpdate.args.data.status).toBe(MsisdnStatus.QUARANTINE);
    expect(msisdnUpdate.args.data.quarantineUntil).toBeDefined();
    expect(msisdnUpdate.args.data.assignedToCustomerId).toBeNull();
  });

  it('deve gerar evento activation.line.deactivated no outbox', async () => {
    await command.execute(activeActivation.orderId);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(2);

    const deactivatedEvent = outboxEvents.find((op) => op.args.data.eventType === 'activation.line.deactivated');
    expect(deactivatedEvent).toBeDefined();
    expect(deactivatedEvent.args.data.payload.orderId).toBe(activeActivation.orderId);
  });

  it('deve gerar evento activation.msisdn.released com status QUARANTINE no outbox', async () => {
    await command.execute(activeActivation.orderId);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    const releasedEvent = outboxEvents.find((op) => op.args.data.eventType === 'activation.msisdn.released');
    expect(releasedEvent).toBeDefined();
    expect(releasedEvent.args.data.payload.status).toBe(MsisdnStatus.QUARANTINE);
    expect(releasedEvent.args.data.payload.quarantineUntil).toBeDefined();
  });

  it('deve rejeitar se ativacao nao encontrada', async () => {
    mockLineActivationRepo.findByOrderId.mockResolvedValue(null);

    await expect(command.execute('non-existent-order')).rejects.toThrow(NotFoundException);
  });
});
