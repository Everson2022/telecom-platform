import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SetLocalityPriceCommand } from '../../src/application/commands/set-locality-price.command';

describe('SetLocalityPriceCommand', () => {
  let command: SetLocalityPriceCommand;
  let mockPrisma: any;
  let mockOfferRepo: any;
  let txOperations: any[];

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          priceLocality: {
            upsert: vi.fn(async (args: any) => {
              txOperations.push({ type: 'priceLocality.upsert', args });
              return args.create;
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

  it('deve usar upsert para criar ou atualizar', async () => {
    await command.execute('offer-1', validDto);

    const upsert = txOperations.find((op) => op.type === 'priceLocality.upsert');
    expect(upsert).toBeDefined();
    expect(upsert.args.where.offerId_dddCode_city).toEqual({
      offerId: 'offer-1',
      dddCode: '11',
      city: 'Sao Paulo',
    });
    expect(upsert.args.create.priceAmountCents).toBe(3990);
    expect(upsert.args.update.priceAmountCents).toBe(3990);
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

  it('deve aceitar preco sem cidade (apenas DDD)', async () => {
    const dto = { ...validDto, city: undefined };

    const result = await command.execute('offer-1', dto);
    expect(result.city).toBeNull();

    const upsert = txOperations.find((op) => op.type === 'priceLocality.upsert');
    expect(upsert.args.where.offerId_dddCode_city.city).toBeNull();
  });

  it('deve usar BRL como moeda padrao quando nao informado', async () => {
    const dto = { dddCode: '21', priceAmountCents: 5990 };

    await command.execute('offer-1', dto);

    const upsert = txOperations.find((op) => op.type === 'priceLocality.upsert');
    expect(upsert.args.create.priceCurrency).toBe('BRL');
  });
});
