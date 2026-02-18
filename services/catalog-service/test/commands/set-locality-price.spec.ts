import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SetLocalityPriceCommand } from '../../src/application/commands/set-locality-price.command';

describe('SetLocalityPriceCommand', () => {
  let command: SetLocalityPriceCommand;
  let mockPrisma: any;
  let mockOfferRepo: any;
  let txOperations: any[];

  const buildTx = (existingPrice: any = null) => ({
    priceLocality: {
      findFirst: vi.fn(async () => existingPrice),
      create: vi.fn(async (args: any) => {
        txOperations.push({ type: 'priceLocality.create', args });
        return args.data;
      }),
      update: vi.fn(async (args: any) => {
        txOperations.push({ type: 'priceLocality.update', args });
        return args.data;
      }),
    },
    outboxEvent: {
      create: vi.fn(async (args: any) => {
        txOperations.push({ type: 'outboxEvent.create', args });
        return args.data;
      }),
    },
  });

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => fn(buildTx())),
    };

    mockOfferRepo = {
      findById: vi.fn().mockResolvedValue({
        id: 'offer-1',
        status: 'ACTIVE',
        name: 'Oferta Verao',
        basePriceAmountCents: 4990,
      }),
    };

    command = new SetLocalityPriceCommand(mockPrisma, mockOfferRepo);
  });

  const validDto = {
    dddCode: '11',
    city: 'Sao Paulo',
    priceAmountCents: 3990,
    priceCurrency: 'BRL',
  };

  it('deve definir preco por localidade com sucesso', async () => {
    const result = await command.execute('offer-1', validDto);

    expect(result).toBeDefined();
    expect(result.offerId).toBe('offer-1');
    expect(result.dddCode).toBe('11');
    expect(result.priceAmountCents).toBe(3990);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();
  });

  it('deve criar novo registro quando nao existe (findFirst retorna null)', async () => {
    // mockPrisma already uses null for findFirst by default
    await command.execute('offer-1', validDto);

    const create = txOperations.find((op) => op.type === 'priceLocality.create');
    expect(create).toBeDefined();
    expect(create.args.data.priceAmountCents).toBe(3990);
    expect(create.args.data.offerId).toBe('offer-1');
    expect(create.args.data.dddCode).toBe('11');
    expect(create.args.data.city).toBe('Sao Paulo');
  });

  it('deve atualizar registro existente quando findFirst retorna resultado', async () => {
    const existing = { id: 'price-existing', offerId: 'offer-1', dddCode: '11', city: 'Sao Paulo' };
    mockPrisma.$transaction = vi.fn(async (fn: any) => fn(buildTx(existing)));

    await command.execute('offer-1', validDto);

    const update = txOperations.find((op) => op.type === 'priceLocality.update');
    expect(update).toBeDefined();
    expect(update.args.where.id).toBe('price-existing');
    expect(update.args.data.priceAmountCents).toBe(3990);
  });

  it('deve gerar evento no outbox', async () => {
    await command.execute('offer-1', validDto);

    const outboxCreate = txOperations.find((op) => op.type === 'outboxEvent.create');
    expect(outboxCreate).toBeDefined();
    expect(outboxCreate.args.data.eventType).toBe('catalog.locality-price.set');
    expect(outboxCreate.args.data.aggregateType).toBe('Offer');
  });

  it('deve rejeitar quando oferta nao existe', async () => {
    mockOfferRepo.findById.mockResolvedValue(null);

    await expect(command.execute('offer-1', validDto)).rejects.toThrow(NotFoundException);
  });

  it('deve rejeitar quando oferta nao esta ACTIVE', async () => {
    mockOfferRepo.findById.mockResolvedValue({ id: 'offer-1', status: 'INACTIVE' });

    await expect(command.execute('offer-1', validDto)).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar preco zero ou negativo', async () => {
    const dto = { ...validDto, priceAmountCents: 0 };

    await expect(command.execute('offer-1', dto)).rejects.toThrow(BadRequestException);
  });

  it('deve aceitar preco sem cidade (apenas DDD) — city sera null', async () => {
    const dto = { ...validDto, city: undefined };

    const result = await command.execute('offer-1', dto);
    expect(result.city).toBeNull();
  });

  it('deve usar BRL como moeda padrao quando nao informado', async () => {
    const dto = { dddCode: '21', priceAmountCents: 5990 };

    await command.execute('offer-1', dto);

    const create = txOperations.find((op) => op.type === 'priceLocality.create');
    expect(create.args.data.priceCurrency).toBe('BRL');
  });
});
