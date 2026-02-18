import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ActivateRecurringBillingCommand } from '../../src/application/commands/activate-recurring-billing.command';
import { PaymentMethodStatus } from '../../src/domain/enums';

describe('ActivateRecurringBillingCommand', () => {
  let command: ActivateRecurringBillingCommand;
  let mockPrisma: any;
  let mockPaymentMethodRepo: any;
  let mockRecurringBillingRepo: any;
  let txOperations: any[];

  const activeMethod = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    status: PaymentMethodStatus.ACTIVE,
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          recurringBilling: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'recurringBilling.create', args });
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

    mockPaymentMethodRepo = {
      findById: vi.fn().mockResolvedValue(activeMethod),
    };

    mockRecurringBillingRepo = {
      findBySubscription: vi.fn().mockResolvedValue(null),
    };

    command = new ActivateRecurringBillingCommand(mockPrisma, mockPaymentMethodRepo, mockRecurringBillingRepo);
  });

  const validDto = {
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    paymentMethodId: '00000000-0000-0000-0000-000000000010',
    amountCents: 2999,
    billingDay: 15,
  };

  it('deve ativar recorrencia com sucesso', async () => {
    const id = await command.execute(validDto);

    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const create = txOperations.find((op) => op.type === 'recurringBilling.create');
    expect(create.args.data.amountCents).toBe(2999);
    expect(create.args.data.billingDay).toBe(15);
    expect(create.args.data.maxRetries).toBe(3);
  });

  it('deve gerar evento payment.recurring.activated no outbox', async () => {
    await command.execute(validDto);

    const outbox = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outbox.args.data.eventType).toBe('payment.recurring.activated');
    expect(outbox.args.data.aggregateType).toBe('RecurringBilling');
  });

  it('deve rejeitar se metodo de pagamento nao encontrado', async () => {
    mockPaymentMethodRepo.findById.mockResolvedValue(null);

    await expect(command.execute(validDto)).rejects.toThrow(NotFoundException);
  });

  it('deve rejeitar se metodo de pagamento inativo', async () => {
    mockPaymentMethodRepo.findById.mockResolvedValue({
      ...activeMethod,
      status: PaymentMethodStatus.INACTIVE,
    });

    await expect(command.execute(validDto)).rejects.toThrow(ConflictException);
  });

  it('deve rejeitar se recorrencia ja existe para a assinatura', async () => {
    mockRecurringBillingRepo.findBySubscription.mockResolvedValue({ id: 'existing' });

    await expect(command.execute(validDto)).rejects.toThrow(ConflictException);
  });

  it('deve usar maxRetries customizado quando fornecido', async () => {
    await command.execute({ ...validDto, maxRetries: 5 });

    const create = txOperations.find((op) => op.type === 'recurringBilling.create');
    expect(create.args.data.maxRetries).toBe(5);
  });
});
