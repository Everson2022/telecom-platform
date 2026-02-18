import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CancelOrderCommand } from '../../src/application/commands/cancel-order.command';
import { OrderAlreadyCancelledException } from '../../src/errors/order-already-cancelled.exception';
import { InvalidOrderStatusTransitionException } from '../../src/errors/invalid-order-status-transition.exception';
import { OrderNotFoundException } from '../../src/errors/order-not-found.exception';

const makeOrder = (status: string) => ({
  id: 'order-uuid-1',
  customerId: 'customer-uuid-1',
  type: 'NEW_PLAN',
  status,
  totalAmountCents: 4990,
  currency: 'BRL',
  paymentMethodType: 'CARD',
  failureReason: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  completedAt: null,
  items: [],
  sagaExecution: null,
});

describe('CancelOrderCommand', () => {
  let command: CancelOrderCommand;
  let mockPrisma: any;
  let mockOrderRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          order: {
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'order.update', args });
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

    mockOrderRepo = {
      findById: vi.fn(),
    };

    command = new CancelOrderCommand(mockPrisma, mockOrderRepo);
  });

  it('deve cancelar pedido CREATED com sucesso', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('CREATED'));

    await expect(command.execute('order-uuid-1')).resolves.toBeUndefined();
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const orderUpdate = txOperations.find((op) => op.type === 'order.update');
    expect(orderUpdate).toBeDefined();
    expect(orderUpdate.args.data.status).toBe('CANCELLED');
  });

  it('deve cancelar pedido PROCESSING com sucesso', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('PROCESSING'));

    await expect(command.execute('order-uuid-1')).resolves.toBeUndefined();
  });

  it('deve lancar OrderAlreadyCancelledException se ja CANCELLED', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('CANCELLED'));

    await expect(command.execute('order-uuid-1')).rejects.toThrow(
      OrderAlreadyCancelledException,
    );
    await expect(command.execute('order-uuid-1')).rejects.toThrow(BadRequestException);
  });

  it('deve lancar InvalidOrderStatusTransitionException se COMPLETED', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('COMPLETED'));

    await expect(command.execute('order-uuid-1')).rejects.toThrow(
      InvalidOrderStatusTransitionException,
    );
    await expect(command.execute('order-uuid-1')).rejects.toThrow(BadRequestException);
  });

  it('deve lancar InvalidOrderStatusTransitionException se FAILED', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('FAILED'));

    await expect(command.execute('order-uuid-1')).rejects.toThrow(
      InvalidOrderStatusTransitionException,
    );
  });

  it('deve lancar OrderNotFoundException se nao encontrado', async () => {
    mockOrderRepo.findById.mockResolvedValue(null);

    await expect(command.execute('non-existent-id')).rejects.toThrow(
      OrderNotFoundException,
    );
    await expect(command.execute('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  it('deve persistir evento order.cancelled no outbox', async () => {
    mockOrderRepo.findById.mockResolvedValue(makeOrder('CREATED'));

    await command.execute('order-uuid-1');

    const outboxCreate = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxCreate).toBeDefined();
    expect(outboxCreate.args.data.eventType).toBe('order.cancelled');
    expect(outboxCreate.args.data.aggregateType).toBe('Order');
    expect(outboxCreate.args.data.aggregateId).toBe('order-uuid-1');
  });

  it('nao deve chamar $transaction se pedido nao encontrado', async () => {
    mockOrderRepo.findById.mockResolvedValue(null);

    await expect(command.execute('non-existent-id')).rejects.toThrow();
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
