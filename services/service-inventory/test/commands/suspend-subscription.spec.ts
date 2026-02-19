import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SuspendSubscriptionCommand } from '../../src/application/commands/suspend-subscription.command';
import { SubscriptionStatus, LineStatus, PlanType } from '../../src/domain/enums';
import { SubscriptionNotFoundException } from '../../src/errors';

describe('SuspendSubscriptionCommand', () => {
  let command: SuspendSubscriptionCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSubscriptionRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockServiceLineRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const activeSubscription = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    planType: PlanType.CONTROL,
    status: SubscriptionStatus.ACTIVE,
    monthlyAmountCents: 4990,
    currency: 'BRL',
    paymentMethodId: null,
    planId: '00000000-0000-0000-0000-000000000002',
    offerId: '00000000-0000-0000-0000-000000000003',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          subscription: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'subscription.update', args });
              return { ...activeSubscription, ...args.data };
            }),
          },
          serviceLine: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updateMany: vi.fn(async (args: any) => {
              txOperations.push({ type: 'serviceLine.updateMany', args });
              return { count: 2 };
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

    mockSubscriptionRepo = {
      findById: vi.fn().mockResolvedValue(activeSubscription),
    };

    mockServiceLineRepo = {};

    command = new SuspendSubscriptionCommand(mockPrisma, mockSubscriptionRepo, mockServiceLineRepo);
  });

  it('deve suspender assinatura e todas as linhas ativas', async () => {
    const result = await command.execute(activeSubscription.id);

    expect(result.status).toBe(SubscriptionStatus.SUSPENDED);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const subscriptionUpdate = txOperations.find((op) => op.type === 'subscription.update');
    expect(subscriptionUpdate.args.data.status).toBe(SubscriptionStatus.SUSPENDED);

    const lineUpdateMany = txOperations.find((op) => op.type === 'serviceLine.updateMany');
    expect(lineUpdateMany.args.where.subscriptionId).toBe(activeSubscription.id);
    expect(lineUpdateMany.args.where.status).toBe(LineStatus.ACTIVE);
    expect(lineUpdateMany.args.data.status).toBe(LineStatus.SUSPENDED);
  });

  it('deve emitir eventos subscription.suspended e all-lines-suspended no outbox', async () => {
    await command.execute(activeSubscription.id);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(2);

    const suspendedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.subscription.suspended',
    );
    expect(suspendedEvent).toBeDefined();
    expect(suspendedEvent.args.data.payload.customerId).toBe(activeSubscription.customerId);

    const allLinesSuspendedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.all-lines-suspended',
    );
    expect(allLinesSuspendedEvent).toBeDefined();
  });

  it('deve lancar SubscriptionNotFoundException para assinatura inexistente', async () => {
    mockSubscriptionRepo.findById.mockResolvedValue(null);

    await expect(command.execute('invalid-id')).rejects.toThrow(SubscriptionNotFoundException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
