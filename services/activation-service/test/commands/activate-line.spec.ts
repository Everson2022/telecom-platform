import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActivateLineCommand } from '../../src/application/commands/activate-line.command';
import { ActivationStatus, MsisdnStatus } from '../../src/domain/enums';

describe('ActivateLineCommand', () => {
  let command: ActivateLineCommand;
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

  const availableMsisdn = {
    id: '00000000-0000-0000-0000-000000000030',
    msisdn: '+5511900000001',
    dddCode: '11',
    status: MsisdnStatus.AVAILABLE,
    reservedForOrderId: null,
    assignedToCustomerId: null,
    quarantineUntil: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const validInput = {
    orderId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    iccid: '8955011000000000001',
    imsi: '724011000000001',
    dddCode: '11',
  };

  const createdActivation = {
    id: '00000000-0000-0000-0000-000000000010',
    ...validInput,
    msisdn: '+5511900000001',
    status: ActivationStatus.ACTIVATED,
    coreTransactionId: 'fake-core-12345',
    networkResponse: { success: true },
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
          msisdnPool: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'msisdnPool.update', args });
              return { ...availableMsisdn, ...args.data };
            }),
          },
          lineActivation: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'lineActivation.create', args });
              return { ...createdActivation, ...args.data };
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
      findByOrderId: vi.fn().mockResolvedValue(null),
    };

    mockMsisdnPoolRepo = {
      findFirstAvailable: vi.fn().mockResolvedValue(availableMsisdn),
      findByMsisdn: vi.fn().mockResolvedValue(availableMsisdn),
    };

    mockCoreClient = {
      provisionSubscriber: vi.fn().mockResolvedValue({ coreTransactionId: 'fake-core-12345', success: true }),
    };

    command = new ActivateLineCommand(mockPrisma, mockLineActivationRepo, mockMsisdnPoolRepo, mockCoreClient);
  });

  it('deve ativar linha com sucesso reservando MSISDN do pool', async () => {
    const result = await command.execute(validInput);

    expect(result).toBeDefined();
    expect(mockCoreClient.provisionSubscriber).toHaveBeenCalledWith({
      iccid: validInput.iccid,
      imsi: validInput.imsi,
      msisdn: availableMsisdn.msisdn,
    });
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const msisdnUpdate = txOperations.find((op) => op.type === 'msisdnPool.update');
    expect(msisdnUpdate.args.data.status).toBe(MsisdnStatus.ACTIVE);
    expect(msisdnUpdate.args.data.assignedToCustomerId).toBe(validInput.customerId);

    const activationCreate = txOperations.find((op) => op.type === 'lineActivation.create');
    expect(activationCreate.args.data.status).toBe(ActivationStatus.ACTIVATED);
    expect(activationCreate.args.data.msisdn).toBe(availableMsisdn.msisdn);
    expect(activationCreate.args.data.coreTransactionId).toBe('fake-core-12345');
  });

  it('deve gerar eventos activation.msisdn.reserved e activation.line.activated no outbox', async () => {
    await command.execute(validInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(2);

    const msisdnReservedEvent = outboxEvents.find((op) => op.args.data.eventType === 'activation.msisdn.reserved');
    expect(msisdnReservedEvent).toBeDefined();

    const lineActivatedEvent = outboxEvents.find((op) => op.args.data.eventType === 'activation.line.activated');
    expect(lineActivatedEvent).toBeDefined();
    expect(lineActivatedEvent.args.data.aggregateType).toBe('LineActivation');
  });

  it('deve ser idempotente — retorna ativacao existente sem reprocessar', async () => {
    mockLineActivationRepo.findByOrderId.mockResolvedValue(createdActivation);

    const result = await command.execute(validInput);

    expect(result?.id).toBe(createdActivation.id);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    expect(mockCoreClient.provisionSubscriber).not.toHaveBeenCalled();
  });

  it('deve retornar null e emitir reservation-failed quando nao ha MSISDN disponivel', async () => {
    mockMsisdnPoolRepo.findFirstAvailable.mockResolvedValue(null);

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

    const result = await command.execute(validInput);

    expect(result).toBeNull();
    const failedEvent = txOperations.find((op) =>
      op.type === 'outboxEvent.create' && op.args.data.eventType === 'activation.msisdn.reservation-failed'
    );
    expect(failedEvent).toBeDefined();
    expect(failedEvent.args.data.payload.dddCode).toBe('11');
  });

  it('deve buscar MSISDN compativel com o DDD do cliente', async () => {
    await command.execute({ ...validInput, dddCode: '21' });

    expect(mockMsisdnPoolRepo.findFirstAvailable).toHaveBeenCalledWith('21');
  });
});
