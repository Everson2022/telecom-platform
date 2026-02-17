import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ChangeStatusCommand } from '../../src/application/commands/change-status.command';

function createMockPrisma() {
  const txMock: any = {
    customer: {
      update: vi.fn().mockResolvedValue({
        id: 'cust-1',
        status: 'SUSPENDED',
        documents: [],
        addresses: [],
      }),
    },
    outboxEvent: { create: vi.fn().mockResolvedValue({}) },
  };

  return {
    $transaction: vi.fn((fn: any) => fn(txMock)),
    _tx: txMock,
  };
}

function createMockCustomerRepo() {
  return {
    findById: vi.fn(),
    exists: vi.fn(),
  };
}

describe('ChangeStatusCommand', () => {
  let command: ChangeStatusCommand;
  let mockPrisma: ReturnType<typeof createMockPrisma>;
  let mockCustomerRepo: ReturnType<typeof createMockCustomerRepo>;

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    mockCustomerRepo = createMockCustomerRepo();
    command = new ChangeStatusCommand(mockPrisma as any, mockCustomerRepo as any);
  });

  it('should suspend an ACTIVE customer', async () => {
    mockCustomerRepo.findById.mockResolvedValue({ id: 'cust-1', status: 'ACTIVE' });

    const result = await command.execute('cust-1', 'SUSPENDED');

    expect(result).toBeDefined();
    expect(mockPrisma._tx.customer.update).toHaveBeenCalled();

    const outboxCall = mockPrisma._tx.outboxEvent.create.mock.calls[0][0];
    expect(outboxCall.data.eventType).toBe('customer.suspended');
  });

  it('should reactivate a SUSPENDED customer', async () => {
    mockCustomerRepo.findById.mockResolvedValue({ id: 'cust-1', status: 'SUSPENDED' });

    await command.execute('cust-1', 'ACTIVE');

    const outboxCall = mockPrisma._tx.outboxEvent.create.mock.calls[0][0];
    expect(outboxCall.data.eventType).toBe('customer.reactivated');
  });

  it('should cancel an ACTIVE customer', async () => {
    mockCustomerRepo.findById.mockResolvedValue({ id: 'cust-1', status: 'ACTIVE' });

    await command.execute('cust-1', 'CANCELLED');

    const outboxCall = mockPrisma._tx.outboxEvent.create.mock.calls[0][0];
    expect(outboxCall.data.eventType).toBe('customer.cancelled');
  });

  it('should throw NotFoundException for unknown customer', async () => {
    mockCustomerRepo.findById.mockResolvedValue(null);

    await expect(command.execute('cust-1', 'SUSPENDED')).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for invalid transition', async () => {
    mockCustomerRepo.findById.mockResolvedValue({ id: 'cust-1', status: 'CANCELLED' });

    await expect(command.execute('cust-1', 'ACTIVE')).rejects.toThrow(BadRequestException);
  });

  it('should not allow CANCELLED -> SUSPENDED', async () => {
    mockCustomerRepo.findById.mockResolvedValue({ id: 'cust-1', status: 'CANCELLED' });

    await expect(command.execute('cust-1', 'SUSPENDED')).rejects.toThrow(BadRequestException);
  });
});
