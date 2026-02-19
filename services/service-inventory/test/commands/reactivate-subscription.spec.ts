import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReactivateSubscriptionCommand } from '../../src/application/commands/reactivate-subscription.command';
import { SubscriptionStatus, LineStatus, PlanType } from '../../src/domain/enums';
import { SubscriptionNotFoundException } from '../../src/errors';

describe('ReactivateSubscriptionCommand', () => {
  let command: ReactivateSubscriptionCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSubscriptionRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const suspendedSubscription = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    planType: PlanType.CONTROL,
    status: SubscriptionStatus.SUSPENDED,
    monthlyAmountCents: 4990,
    currency: 'BRL',
    paymentMethodId: '00000000-0000-0000-0000-000000000004',
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
              return { ...suspendedSubscription, ...args.data };
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
      findById: vi.fn().mockResolvedValue(suspendedSubscription),
    };

    command = new ReactivateSubscriptionCommand(mockPrisma, mockSubscriptionRepo);
  });

  it('deve reativar assinatura e linhas suspensas', async () => {
    const result = await command.execute(suspendedSubscription.id);

    expect(result.status).toBe(SubscriptionStatus.ACTIVE);

    const subscriptionUpdate = txOperations.find((op) => op.type === 'subscription.update');
    expect(subscriptionUpdate.args.data.status).toBe(SubscriptionStatus.ACTIVE);

    const lineUpdateMany = txOperations.find((op) => op.type === 'serviceLine.updateMany');
    expect(lineUpdateMany.args.where.status).toBe(LineStatus.SUSPENDED);
    expect(lineUpdateMany.args.data.status).toBe(LineStatus.ACTIVE);
  });

  it('deve emitir evento subscription.reactivated no outbox', async () => {
    await command.execute(suspendedSubscription.id);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const reactivatedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.subscription.reactivated',
    );
    expect(reactivatedEvent).toBeDefined();
    expect(reactivatedEvent.args.data.payload.paymentMethodId).toBe(
      suspendedSubscription.paymentMethodId,
    );
  });

  it('deve lancar SubscriptionNotFoundException para assinatura inexistente', async () => {
    mockSubscriptionRepo.findById.mockResolvedValue(null);

    await expect(command.execute('invalid-id')).rejects.toThrow(SubscriptionNotFoundException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
