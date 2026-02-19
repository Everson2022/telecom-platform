import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkCyclePaidCommand } from '../../src/application/commands/mark-cycle-paid.command';
import { BillingCycleStatus } from '../../src/domain/enums';
import { BillingCycleNotFoundException } from '../../src/errors';

describe('MarkCyclePaidCommand', () => {
  let command: MarkCyclePaidCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockBillingCycleRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const existingCycle = {
    id: '00000000-0000-0000-0000-000000000010',
    subscriptionId: '00000000-0000-0000-0000-000000000001',
    customerId: '00000000-0000-0000-0000-000000000002',
    cycleStartDate: new Date('2026-02-01'),
    cycleEndDate: new Date('2026-02-28'),
    dueDate: new Date('2026-03-10'),
    amountCents: 4990,
    currency: 'BRL',
    status: BillingCycleStatus.GENERATED,
    paymentTransactionId: null,
    invoiceNumber: 'INV-202602-00000000',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const paymentTransactionId = '00000000-0000-0000-0000-000000000099';

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          billingCycle: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'billingCycle.update', args });
              return { ...existingCycle, ...args.data };
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
      findById: vi.fn().mockResolvedValue(existingCycle),
    };

    command = new MarkCyclePaidCommand(mockPrisma, mockBillingCycleRepo);
  });

  it('deve marcar ciclo como PAID com paymentTransactionId', async () => {
    const result = await command.execute({
      billingCycleId: existingCycle.id,
      paymentTransactionId,
    });

    expect(result.status).toBe(BillingCycleStatus.PAID);
    expect(result.paymentTransactionId).toBe(paymentTransactionId);

    const cycleUpdate = txOperations.find((op) => op.type === 'billingCycle.update');
    expect(cycleUpdate.args.data.status).toBe(BillingCycleStatus.PAID);
    expect(cycleUpdate.args.data.paymentTransactionId).toBe(paymentTransactionId);
  });

  it('deve emitir evento billing.cycle.paid no outbox', async () => {
    await command.execute({ billingCycleId: existingCycle.id, paymentTransactionId });

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const paidEvent = outboxEvents.find((op) => op.args.data.eventType === 'billing.cycle.paid');
    expect(paidEvent).toBeDefined();
    expect(paidEvent.args.data.payload.paymentTransactionId).toBe(paymentTransactionId);
  });

  it('deve lancar BillingCycleNotFoundException para ciclo inexistente', async () => {
    mockBillingCycleRepo.findById.mockResolvedValue(null);

    await expect(
      command.execute({ billingCycleId: 'invalid-id', paymentTransactionId }),
    ).rejects.toThrow(BillingCycleNotFoundException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
