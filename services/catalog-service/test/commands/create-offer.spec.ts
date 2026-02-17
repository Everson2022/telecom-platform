import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOfferCommand } from '../../src/application/commands/create-offer.command';

describe('CreateOfferCommand', () => {
  let command: CreateOfferCommand;
  let mockPrisma: any;
  let mockPlanRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          offer: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'offer.create', args });
              return args.data;
            }),
          },
          eligibilityRule: {
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'eligibilityRule.create', args });
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
      findById: vi.fn().mockResolvedValue({ id: 'plan-1', status: 'ACTIVE', name: 'Controle 15GB' }),
    };

    command = new CreateOfferCommand(mockPrisma, mockPlanRepo);
  });

  const validDto = {
    planId: 'plan-1',
    name: 'Oferta Verao 2025',
    basePriceAmountCents: 4990,
    basePriceCurrency: 'BRL',
    validFrom: '2025-01-01T00:00:00Z',
    validUntil: '2025-12-31T23:59:59Z',
    eligibilityRules: [
      { ruleType: 'MIN_AGE', ruleValue: { value: 18 } },
    ],
  };

  it('deve criar oferta com sucesso', async () => {
    const offerId = await command.execute(validDto);

    expect(offerId).toBeDefined();
    expect(typeof offerId).toBe('string');
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const offerCreate = txOperations.find((op) => op.type === 'offer.create');
    expect(offerCreate).toBeDefined();
    expect(offerCreate.args.data.name).toBe('Oferta Verao 2025');
    expect(offerCreate.args.data.basePriceAmountCents).toBe(4990);
  });

  it('deve criar regras de elegibilidade', async () => {
    await command.execute(validDto);

    const ruleCreates = txOperations.filter((op) => op.type === 'eligibilityRule.create');
    expect(ruleCreates).toHaveLength(1);
    expect(ruleCreates[0].args.data.ruleType).toBe('MIN_AGE');
  });

  it('deve gerar evento no outbox', async () => {
    await command.execute(validDto);

    const outboxCreate = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxCreate).toBeDefined();
    expect(outboxCreate.args.data.eventType).toBe('catalog.offer.created');
    expect(outboxCreate.args.data.aggregateType).toBe('Offer');
  });

  it('deve rejeitar quando plano nao existe', async () => {
    mockPlanRepo.findById.mockResolvedValue(null);

    await expect(command.execute(validDto)).rejects.toThrow(NotFoundException);
  });

  it('deve rejeitar quando plano nao esta ACTIVE', async () => {
    mockPlanRepo.findById.mockResolvedValue({ id: 'plan-1', status: 'DEPRECATED' });

    await expect(command.execute(validDto)).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar preco zero ou negativo', async () => {
    const dto = { ...validDto, basePriceAmountCents: 0 };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar validFrom >= validUntil', async () => {
    const dto = {
      ...validDto,
      validFrom: '2025-12-31T23:59:59Z',
      validUntil: '2025-01-01T00:00:00Z',
    };

    await expect(command.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve criar oferta sem validUntil', async () => {
    const dto = { ...validDto, validUntil: undefined };

    const offerId = await command.execute(dto);
    expect(offerId).toBeDefined();

    const offerCreate = txOperations.find((op) => op.type === 'offer.create');
    expect(offerCreate.args.data.validUntil).toBeNull();
  });

  it('deve criar oferta sem regras de elegibilidade', async () => {
    const dto = { ...validDto, eligibilityRules: undefined };

    const offerId = await command.execute(dto);
    expect(offerId).toBeDefined();

    const ruleCreates = txOperations.filter((op) => op.type === 'eligibilityRule.create');
    expect(ruleCreates).toHaveLength(0);
  });
});
