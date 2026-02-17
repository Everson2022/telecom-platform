import { describe, it, expect } from 'vitest';
import { Money } from './money';

describe('Money', () => {
  it('should create from cents', () => {
    const money = Money.fromCents(1990, 'BRL');
    expect(money.amountCents).toBe(1990);
    expect(money.currency).toBe('BRL');
  });

  it('should create from decimal', () => {
    const money = Money.fromDecimal(19.90, 'BRL');
    expect(money.amountCents).toBe(1990);
  });

  it('should create zero', () => {
    const money = Money.zero();
    expect(money.amountCents).toBe(0);
    expect(money.isZero()).toBe(true);
  });

  it('should add two money values', () => {
    const a = Money.fromCents(1000);
    const b = Money.fromCents(500);
    const result = a.add(b);
    expect(result.amountCents).toBe(1500);
  });

  it('should subtract two money values', () => {
    const a = Money.fromCents(1000);
    const b = Money.fromCents(300);
    const result = a.subtract(b);
    expect(result.amountCents).toBe(700);
  });

  it('should multiply by factor', () => {
    const money = Money.fromCents(1000);
    const result = money.multiply(1.5);
    expect(result.amountCents).toBe(1500);
  });

  it('should throw when operating on different currencies', () => {
    const brl = Money.fromCents(1000, 'BRL');
    const usd = Money.fromCents(1000, 'USD');
    expect(() => brl.add(usd)).toThrow('Cannot operate on different currencies');
  });

  it('should compare equality', () => {
    const a = Money.fromCents(1000, 'BRL');
    const b = Money.fromCents(1000, 'BRL');
    expect(a.equals(b)).toBe(true);
  });

  it('should convert to decimal', () => {
    const money = Money.fromCents(1990);
    expect(money.toDecimal()).toBe(19.90);
  });

  it('should check positive/negative', () => {
    expect(Money.fromCents(100).isPositive()).toBe(true);
    expect(Money.fromCents(-100).isNegative()).toBe(true);
    expect(Money.fromCents(0).isZero()).toBe(true);
  });

  it('should serialize to JSON', () => {
    const money = Money.fromCents(1990, 'BRL');
    expect(money.toJSON()).toEqual({ amountCents: 1990, currency: 'BRL' });
  });

  it('should reject non-integer amounts', () => {
    expect(() => Money.fromCents(19.5)).toThrow('Money amount must be an integer');
  });

  it('should compare greaterThan', () => {
    const a = Money.fromCents(2000);
    const b = Money.fromCents(1000);
    expect(a.greaterThan(b)).toBe(true);
    expect(b.greaterThan(a)).toBe(false);
  });
});
