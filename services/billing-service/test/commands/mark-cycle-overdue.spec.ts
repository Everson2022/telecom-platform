import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkCycleOverdueCommand } from '../../src/application/commands/mark-cycle-overdue.command';
import { BillingCycleStatus } from '../../src/domain/enums';
import { BillingCycleNotFoundException } from '../../src/errors';

describe('MarkCycleOverdueCommand', () => {
  let command: MarkCycleOverdueCommand;
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
    status: BillingCycleStatus.PAYMENT_PENDING,
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

    command = new MarkCycleOverdueCommand(mockPrisma, mockBillingCycleRepo);
  });

  it('deve marcar ciclo como OVERDUE', async () => {
    const result = await command.execute(existingCycle.id);

    expect(result.status).toBe(BillingCycleStatus.OVERDUE);

    const cycleUpdate = txOperations.find((op) => op.type === 'billingCycle.update');
    expect(cycleUpdate.args.data.status).toBe(BillingCycleStatus.OVERDUE);
  });

  it('deve emitir evento billing.cycle.overdue com dueDate no payload', async () => {
    await command.execute(existingCycle.id);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const overdueEvent = outboxEvents.find((op) => op.args.data.eventType === 'billing.cycle.overdue');
    expect(overdueEvent).toBeDefined();
    expect(overdueEvent.args.data.payload.dueDate).toBeDefined();
    expect(overdueEvent.args.data.payload.customerId).toBe(existingCycle.customerId);
  });

  it('deve lancar BillingCycleNotFoundException para ciclo inexistente', async () => {
    mockBillingCycleRepo.findById.mockResolvedValue(null);

    await expect(command.execute('invalid-id')).rejects.toThrow(BillingCycleNotFoundException);
  });
});
