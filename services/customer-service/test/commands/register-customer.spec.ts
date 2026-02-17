import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { RegisterCustomerCommand } from '../../src/application/commands/register-customer.command';

function createMockPrisma() {
  const txMock: any = {
    customer: { create: vi.fn().mockResolvedValue({ id: 'cust-1' }) },
    customerDocument: { create: vi.fn().mockResolvedValue({}) },
    customerAddress: { create: vi.fn().mockResolvedValue({}) },
    outboxEvent: { create: vi.fn().mockResolvedValue({}) },
  };

  return {
    $transaction: vi.fn((fn: any) => fn(txMock)),
    _tx: txMock,
  };
}

function createMockCustomerRepo() {
  return {
    findByCpf: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    findById: vi.fn(),
    exists: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    findMany: vi.fn(),
  };
}

const validDto = {
  fullName: 'Joao da Silva',
  cpf: '529.982.247-25',
  birthDate: '1990-05-15',
  email: 'joao@example.com',
  phone: '11999998888',
  documents: [
    {
      type: 'CPF' as const,
      number: '52998224725',
      issuingAuthority: 'RFB',
      issueDate: '2020-01-01',
    },
  ],
  addresses: [
    {
      type: 'RESIDENTIAL' as const,
      zipCode: '01001-000',
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'Sao Paulo',
      state: 'SP',
      dddCode: '11',
    },
  ],
};

describe('RegisterCustomerCommand', () => {
  let command: RegisterCustomerCommand;
  let mockPrisma: ReturnType<typeof createMockPrisma>;
  let mockCustomerRepo: ReturnType<typeof createMockCustomerRepo>;

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    mockCustomerRepo = createMockCustomerRepo();
    command = new RegisterCustomerCommand(
      mockPrisma as any,
      mockCustomerRepo as any,
    );
  });

  it('should register a customer successfully', async () => {
    const customerId = await command.execute(validDto);

    expect(customerId).toBeDefined();
    expect(typeof customerId).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalled();
    expect(mockPrisma._tx.customer.create).toHaveBeenCalled();
    expect(mockPrisma._tx.customerDocument.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma._tx.customerAddress.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma._tx.outboxEvent.create).toHaveBeenCalled();
  });

  it('should throw ConflictException for duplicate CPF', async () => {
    mockCustomerRepo.findByCpf.mockResolvedValue({ id: 'existing' });

    await expect(command.execute(validDto)).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException for duplicate email', async () => {
    mockCustomerRepo.findByEmail.mockResolvedValue({ id: 'existing' });

    await expect(command.execute(validDto)).rejects.toThrow(ConflictException);
  });

  it('should throw BadRequestException when no documents provided', async () => {
    const dto = { ...validDto, documents: [] };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when no addresses provided', async () => {
    const dto = { ...validDto, addresses: [] };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when no RESIDENTIAL address', async () => {
    const dto = {
      ...validDto,
      addresses: [{ ...validDto.addresses[0], type: 'BILLING' as const }],
    };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw for invalid CPF', async () => {
    const dto = { ...validDto, cpf: '111.111.111-11' };

    await expect(command.execute(dto)).rejects.toThrow('Invalid CPF');
  });

  it('should throw for invalid email', async () => {
    const dto = { ...validDto, email: 'not-an-email' };

    await expect(command.execute(dto)).rejects.toThrow('Invalid email');
  });

  it('should persist outbox event with correct type', async () => {
    await command.execute(validDto);

    const outboxCall = mockPrisma._tx.outboxEvent.create.mock.calls[0][0];
    expect(outboxCall.data.eventType).toBe('customer.registered');
    expect(outboxCall.data.aggregateType).toBe('Customer');
  });
});
