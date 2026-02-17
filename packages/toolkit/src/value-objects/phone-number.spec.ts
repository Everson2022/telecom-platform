import { describe, it, expect } from 'vitest';
import { PhoneNumber } from './phone-number';

describe('PhoneNumber', () => {
  it('should create from full number with country code', () => {
    const phone = PhoneNumber.create('5511999998888');
    expect(phone.toString()).toBe('5511999998888');
    expect(phone.toE164()).toBe('+5511999998888');
  });

  it('should create from number without country code', () => {
    const phone = PhoneNumber.create('11999998888');
    expect(phone.toE164()).toBe('+5511999998888');
  });

  it('should extract DDD', () => {
    const phone = PhoneNumber.create('5511999998888');
    expect(phone.getDdd()).toBe('11');
  });

  it('should extract DDD without country code', () => {
    const phone = PhoneNumber.create('21999998888');
    expect(phone.getDdd()).toBe('21');
  });

  it('should reject invalid phone', () => {
    expect(() => PhoneNumber.create('123')).toThrow('Invalid phone number');
    expect(() => PhoneNumber.create('')).toThrow('Invalid phone number');
  });

  it('should validate statically', () => {
    expect(PhoneNumber.isValid('5511999998888')).toBe(true);
    expect(PhoneNumber.isValid('11999998888')).toBe(true);
    expect(PhoneNumber.isValid('123')).toBe(false);
  });

  it('should format phone', () => {
    const phone = PhoneNumber.create('5511999998888');
    expect(phone.toFormatted()).toBe('+55 (11) 99999-8888');
  });

  it('should compare equality', () => {
    const a = PhoneNumber.create('5511999998888');
    const b = PhoneNumber.create('11999998888');
    expect(a.equals(b)).toBe(true);
  });
});
