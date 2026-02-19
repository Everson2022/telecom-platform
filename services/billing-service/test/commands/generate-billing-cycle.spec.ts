import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GenerateBillingCycleCommand } from '../../src/application/commands/generate-billing-cycle.command';
import { BillingCycleStatus } from '../../src/domain/enums';
import { DuplicateBillingCycleException } from '../../src/errors';

describe('GenerateBillingCycleCommand', () => {
  let command: GenerateBillingCycleCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockBillingCycleRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const cycleStartDate = new Date('2026-02-01');
  const cycleEndDate = new Date('2026-02-28');
  const dueDate = new Date('2026-03-10');

  const validInput = {
    subscriptionId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    cycleStartDate,
    cycleEndDate,
    dueDate,
    amountCents: 4990,
    currency: 'BRL',
  };

  const createdCycle = {
    id: '00000000-0000-0000-0000-000000000010',
    subscriptionId: validInput.subscriptionId,
    customerId: validInput.customerId,
    cycleStartDate,
    cycleEndDate,
    dueDate,
    amountCents: 4990,
    currency: 'BRL',
    status: BillingCycleStatus.GENERATED,
    paymentTransactionId: null,
    invoiceNumber: 'INV-202602-00000000',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          billingCycle: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'billingCycle.create', args });
              return createdCycle;
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

    mockBillingCycleRepo = {
      findCurrentBySubscription: vi.fn().mockResolvedValue(null),
    };

    command = new GenerateBillingCycleCommand(mockPrisma, mockBillingCycleRepo);
  });

  it('deve gerar ciclo de cobrança com status GENERATED e invoiceNumber', async () => {
    const result = await command.execute(validInput);

    expect(result).toBeDefined();
    expect(result.status).toBe(BillingCycleStatus.GENERATED);
    expect(result.invoiceNumber).toContain('INV-202602');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const cycleCreate = txOperations.find((op) => op.type === 'billingCycle.create');
    expect(cycleCreate.args.data.subscriptionId).toBe(validInput.subscriptionId);
    expect(cycleCreate.args.data.amountCents).toBe(4990);
  });

  it('deve emitir evento billing.cycle.generated no outbox', async () => {
    await command.execute(validInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const generatedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'billing.cycle.generated',
    );
    expect(generatedEvent).toBeDefined();
    expect(generatedEvent.args.data.payload.subscriptionId).toBe(validInput.subscriptionId);
  });

  it('deve lancar DuplicateBillingCycleException para ciclo duplicado no mesmo periodo', async () => {
    mockBillingCycleRepo.findCurrentBySubscription.mockResolvedValue(createdCycle);

    await expect(command.execute(validInput)).rejects.toThrow(DuplicateBillingCycleException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  it('deve gerar invoiceNumber no formato INV-AAAAMM-XXXXXXXX', async () => {
    await command.execute(validInput);

    const cycleCreate = txOperations.find((op) => op.type === 'billingCycle.create');
    expect(cycleCreate.args.data.invoiceNumber).toMatch(/^INV-\d{6}-[A-Z0-9]{8}$/);
  });
});
