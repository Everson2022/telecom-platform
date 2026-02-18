import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProcessPaymentCommand } from '../../src/application/commands/process-payment.command';
import { PaymentMethodStatus, TransactionStatus, TransactionType } from '../../src/domain/enums';

describe('ProcessPaymentCommand', () => {
  let command: ProcessPaymentCommand;
  let mockPrisma: any;
  let mockPaymentMethodRepo: any;
  let mockTransactionRepo: any;
  let txOperations: any[];

  const activeMethod = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    status: PaymentMethodStatus.ACTIVE,
    type: 'CARD',
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          paymentTransaction: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'paymentTransaction.create', args });
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

    mockTransactionRepo = {
      findByIdempotencyKey: vi.fn().mockResolvedValue(null),
    };

    command = new ProcessPaymentCommand(mockPrisma, mockPaymentMethodRepo, mockTransactionRepo);
  });

  const validDto = {
    paymentMethodId: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    type: TransactionType.ONE_TIME,
    amountCents: 2999,
    idempotencyKey: 'order:abc123:payment',
  };

  it('deve processar pagamento com sucesso', async () => {
    const result = await command.execute(validDto);

    expect(result).toBeDefined();
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const txCreate = txOperations.find((op) => op.type === 'paymentTransaction.create');
    expect(txCreate.args.data.status).toBe(TransactionStatus.APPROVED);
    expect(txCreate.args.data.amountCents).toBe(2999);
    expect(txCreate.args.data.idempotencyKey).toBe('order:abc123:payment');
  });

  it('deve gerar evento payment.processed no outbox', async () => {
    await command.execute(validDto);

    const outbox = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outbox.args.data.eventType).toBe('payment.processed');
    expect(outbox.args.data.aggregateType).toBe('PaymentTransaction');
  });

  it('deve ser idempotente — retorna transacao existente sem reprocessar', async () => {
    const existingTransaction = { id: 'existing-tx', ...validDto, status: TransactionStatus.APPROVED };
    mockTransactionRepo.findByIdempotencyKey.mockResolvedValue(existingTransaction);

    const result = await command.execute(validDto);

    expect(result.id).toBe('existing-tx');
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
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

    await expect(command.execute(validDto)).rejects.toThrow(BadRequestException);
  });
});
