import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RefundPaymentCommand } from '../../src/application/commands/refund-payment.command';
import { TransactionStatus, TransactionType } from '../../src/domain/enums';

describe('RefundPaymentCommand', () => {
  let command: RefundPaymentCommand;
  let mockPrisma: any;
  let mockTransactionRepo: any;
  let txOperations: any[];

  const approvedTransaction = {
    id: '00000000-0000-0000-0000-000000000030',
    paymentMethodId: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    orderId: null,
    status: TransactionStatus.APPROVED,
    amountCents: 2999,
    currency: 'BRL',
    type: TransactionType.ONE_TIME,
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          paymentTransaction: {
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'paymentTransaction.update', args });
              return args.data;
            }),
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

    mockTransactionRepo = {
      findById: vi.fn().mockResolvedValue(approvedTransaction),
    };

    command = new RefundPaymentCommand(mockPrisma, mockTransactionRepo);
  });

  it('deve estornar transacao com sucesso', async () => {
    await command.execute(approvedTransaction.id);

    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const update = txOperations.find((op) => op.type === 'paymentTransaction.update');
    expect(update.args.data.status).toBe(TransactionStatus.REFUNDED);

    const refundCreate = txOperations.find((op) => op.type === 'paymentTransaction.create');
    expect(refundCreate.args.data.type).toBe(TransactionType.REFUND);
    expect(refundCreate.args.data.amountCents).toBe(2999);
  });

  it('deve gerar evento payment.refunded no outbox', async () => {
    await command.execute(approvedTransaction.id);

    const outbox = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outbox.args.data.eventType).toBe('payment.refunded');
  });

  it('deve rejeitar se transacao nao encontrada', async () => {
    mockTransactionRepo.findById.mockResolvedValue(null);

    await expect(command.execute('non-existent')).rejects.toThrow(NotFoundException);
  });

  it('deve rejeitar se transacao nao esta APPROVED', async () => {
    mockTransactionRepo.findById.mockResolvedValue({
      ...approvedTransaction,
      status: TransactionStatus.DECLINED,
    });

    await expect(command.execute(approvedTransaction.id)).rejects.toThrow(BadRequestException);
  });
});
