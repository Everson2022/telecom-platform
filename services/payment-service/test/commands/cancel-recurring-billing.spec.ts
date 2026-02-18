import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { CancelRecurringBillingCommand } from '../../src/application/commands/cancel-recurring-billing.command';
import { RecurringStatus } from '../../src/domain/enums';

describe('CancelRecurringBillingCommand', () => {
  let command: CancelRecurringBillingCommand;
  let mockPrisma: any;
  let mockRecurringBillingRepo: any;
  let txOperations: any[];

  const activeBilling = {
    id: '00000000-0000-0000-0000-000000000020',
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    status: RecurringStatus.ACTIVE,
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          recurringBilling: {
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'recurringBilling.update', args });
              return args.data;
            }),
          },
          outboxEvent: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'outboxEvent.create', args });
              return args.data;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockRecurringBillingRepo = {
      findById: vi.fn().mockResolvedValue(activeBilling),
    };

    command = new CancelRecurringBillingCommand(mockPrisma, mockRecurringBillingRepo);
  });

  it('deve cancelar recorrencia com sucesso', async () => {
    await command.execute(activeBilling.id);

    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const update = txOperations.find((op) => op.type === 'recurringBilling.update');
    expect(update.args.data.status).toBe(RecurringStatus.CANCELLED);
  });

  it('deve gerar evento payment.recurring.cancelled no outbox', async () => {
    await command.execute(activeBilling.id);

    const outbox = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outbox.args.data.eventType).toBe('payment.recurring.cancelled');
  });

  it('deve rejeitar se recorrencia nao encontrada', async () => {
    mockRecurringBillingRepo.findById.mockResolvedValue(null);

    await expect(command.execute('non-existent')).rejects.toThrow(NotFoundException);
  });
});
