import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateOrderCommand } from '../../src/application/commands/create-order.command';

describe('CreateOrderCommand', () => {
  let command: CreateOrderCommand;
  let mockPrisma: any;
  let mockOrderRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          order: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'order.create', args });
              return args.data;
            }),
          },
          orderItem: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'orderItem.create', args });
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

    mockOrderRepo = {};

    command = new CreateOrderCommand(mockPrisma, mockOrderRepo);
  });

  const validInput = {
    customerId: 'customer-uuid-1234',
    type: 'NEW_PLAN',
    totalAmountCents: 4990,
    paymentMethodType: 'CARD',
    items: [
      { offerId: 'offer-uuid-1', quantity: 1, priceAmountCents: 4990 },
    ],
  };

  it('deve criar pedido e retornar orderId', async () => {
    const orderId = await command.execute(validInput);

    expect(orderId).toBeDefined();
    expect(typeof orderId).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const orderCreate = txOperations.find((op) => op.type === 'order.create');
    expect(orderCreate).toBeDefined();
    expect(orderCreate.args.data.customerId).toBe('customer-uuid-1234');
    expect(orderCreate.args.data.type).toBe('NEW_PLAN');
    expect(orderCreate.args.data.totalAmountCents).toBe(4990);
    expect(orderCreate.args.data.status).toBe('CREATED');
  });

  it('deve criar OrderItems na transacao', async () => {
    const inputWithMultipleItems = {
      ...validInput,
      items: [
        { offerId: 'offer-uuid-1', quantity: 1, priceAmountCents: 2990 },
        { offerId: 'offer-uuid-2', quantity: 2, priceAmountCents: 1000 },
      ],
    };

    await command.execute(inputWithMultipleItems);

    const itemCreates = txOperations.filter((op) => op.type === 'orderItem.create');
    expect(itemCreates).toHaveLength(2);
    expect(itemCreates[0].args.data.offerId).toBe('offer-uuid-1');
    expect(itemCreates[0].args.data.quantity).toBe(1);
    expect(itemCreates[1].args.data.offerId).toBe('offer-uuid-2');
    expect(itemCreates[1].args.data.quantity).toBe(2);
  });

  it('deve persistir evento order.created no outbox', async () => {
    const orderId = await command.execute(validInput);

    const outboxCreate = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxCreate).toBeDefined();
    expect(outboxCreate.args.data.eventType).toBe('order.created');
    expect(outboxCreate.args.data.aggregateType).toBe('Order');
    expect(outboxCreate.args.data.aggregateId).toBe(orderId);
  });

  it('deve usar BRL como currency padrao', async () => {
    await command.execute(validInput);

    const orderCreate = txOperations.find((op) => op.type === 'order.create');
    expect(orderCreate.args.data.currency).toBe('BRL');

    const itemCreate = txOperations.find((op) => op.type === 'orderItem.create');
    expect(itemCreate.args.data.priceCurrency).toBe('BRL');
  });

  it('deve respeitar currency personalizada', async () => {
    const inputWithCurrency = { ...validInput, currency: 'USD' };

    await command.execute(inputWithCurrency);

    const orderCreate = txOperations.find((op) => op.type === 'order.create');
    expect(orderCreate.args.data.currency).toBe('USD');
  });

  it('deve vincular items ao orderId correto', async () => {
    const orderId = await command.execute(validInput);

    const itemCreate = txOperations.find((op) => op.type === 'orderItem.create');
    expect(itemCreate.args.data.orderId).toBe(orderId);
  });
});
