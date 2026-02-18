import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConflictException } from '@nestjs/common';
import { RegisterPaymentMethodCommand } from '../../src/application/commands/register-payment-method.command';
import { PaymentMethodType } from '../../src/domain/enums';

describe('RegisterPaymentMethodCommand', () => {
  let command: RegisterPaymentMethodCommand;
  let mockPrisma: any;
  let mockPaymentMethodRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          paymentMethod: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'paymentMethod.create', args });
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
      findBySubscription: vi.fn().mockResolvedValue(null),
    };

    command = new RegisterPaymentMethodCommand(mockPrisma, mockPaymentMethodRepo);
  });

  const cardDto = {
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000002',
    type: PaymentMethodType.CARD,
    card: {
      lastFour: '1234',
      brand: 'VISA',
      holderName: 'Joao Silva',
      expMonth: 12,
      expYear: 2028,
      tokenizedId: 'tok_abc123',
    },
  };

  const pixDto = {
    customerId: '00000000-0000-0000-0000-000000000001',
    subscriptionId: '00000000-0000-0000-0000-000000000003',
    type: PaymentMethodType.PIX,
    pix: {
      keyType: 'CPF',
      key: '12345678901',
    },
  };

  it('deve registrar metodo CARD com sucesso', async () => {
    const id = await command.execute(cardDto);

    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const create = txOperations.find((op) => op.type === 'paymentMethod.create');
    expect(create.args.data.type).toBe(PaymentMethodType.CARD);
    expect(create.args.data.cardLastFour).toBe('1234');
    expect(create.args.data.pixKey).toBeNull();
  });

  it('deve registrar metodo PIX com sucesso', async () => {
    const id = await command.execute(pixDto);

    expect(id).toBeDefined();

    const create = txOperations.find((op) => op.type === 'paymentMethod.create');
    expect(create.args.data.type).toBe(PaymentMethodType.PIX);
    expect(create.args.data.pixKey).toBe('12345678901');
    expect(create.args.data.cardLastFour).toBeNull();
  });

  it('deve gerar evento no outbox', async () => {
    await command.execute(cardDto);

    const outbox = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outbox).toBeDefined();
    expect(outbox.args.data.eventType).toBe('payment.method.registered');
    expect(outbox.args.data.aggregateType).toBe('PaymentMethod');
  });

  it('deve rejeitar se ja existe metodo ativo para a assinatura', async () => {
    mockPaymentMethodRepo.findBySubscription.mockResolvedValue({ id: 'existing' });

    await expect(command.execute(cardDto)).rejects.toThrow(ConflictException);
  });
});
