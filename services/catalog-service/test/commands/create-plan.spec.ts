import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { CreatePlanCommand } from '../../src/application/commands/create-plan.command';

describe('CreatePlanCommand', () => {
  let command: CreatePlanCommand;
  let mockPrisma: any;
  let mockPlanRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          plan: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'plan.create', args });
              return args.data;
            }),
          },
          planFeature: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'planFeature.create', args });
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

    mockPlanRepo = {
      findByName: vi.fn().mockResolvedValue(null),
    };

    command = new CreatePlanCommand(mockPrisma, mockPlanRepo);
  });

  const validDto = {
    name: 'Controle 15GB',
    type: 'CONTROL' as const,
    maxLines: 5,
    allowedPaymentMethods: ['CARD' as const, 'PIX' as const],
    features: [
      { name: 'Dados', quota: 15, unit: 'GB' as const, unlimited: false },
      { name: 'Voz', quota: 0, unit: 'MIN' as const, unlimited: true },
    ],
  };

  it('deve criar plano com sucesso', async () => {
    const planId = await command.execute(validDto);

    expect(planId).toBeDefined();
    expect(typeof planId).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const planCreate = txOperations.find((op) => op.type === 'plan.create');
    expect(planCreate).toBeDefined();
    expect(planCreate.args.data.name).toBe('Controle 15GB');
    expect(planCreate.args.data.type).toBe('CONTROL');
    expect(planCreate.args.data.maxLines).toBe(5);
  });

  it('deve criar features junto com o plano', async () => {
    await command.execute(validDto);

    const featureCreates = txOperations.filter((op) => op.type === 'planFeature.create');
    expect(featureCreates).toHaveLength(2);
    expect(featureCreates[0].args.data.name).toBe('Dados');
    expect(featureCreates[1].args.data.name).toBe('Voz');
    expect(featureCreates[1].args.data.unlimited).toBe(true);
  });

  it('deve gerar evento no outbox', async () => {
    await command.execute(validDto);

    const outboxCreate = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxCreate).toBeDefined();
    expect(outboxCreate.args.data.eventType).toBe('catalog.plan.created');
    expect(outboxCreate.args.data.aggregateType).toBe('Plan');
  });

  it('deve rejeitar nome duplicado', async () => {
    mockPlanRepo.findByName.mockResolvedValue({ id: 'existing', name: 'Controle 15GB' });

    await expect(command.execute(validDto)).rejects.toThrow(ConflictException);
  });

  it('deve rejeitar maxLines incorreto para CONTROL', async () => {
    const dto = { ...validDto, maxLines: 1 };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar maxLines incorreto para PREPAID', async () => {
    const dto = { ...validDto, type: 'PREPAID' as const, maxLines: 5 };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve auto-definir maxLines quando omitido', async () => {
    const dto = { ...validDto, maxLines: undefined };

    await command.execute(dto);

    const planCreate = txOperations.find((op) => op.type === 'plan.create');
    expect(planCreate.args.data.maxLines).toBe(5); // CONTROL = 5
  });

  it('deve criar plano PREPAID com maxLines=1', async () => {
    const dto = { ...validDto, type: 'PREPAID' as const, maxLines: 1 };

    await command.execute(dto);

    const planCreate = txOperations.find((op) => op.type === 'plan.create');
    expect(planCreate.args.data.maxLines).toBe(1);
  });

  it('deve criar plano sem features', async () => {
    const dto = { ...validDto, features: undefined };

    const planId = await command.execute(dto);
    expect(planId).toBeDefined();

    const featureCreates = txOperations.filter((op) => op.type === 'planFeature.create');
    expect(featureCreates).toHaveLength(0);
  });
});
