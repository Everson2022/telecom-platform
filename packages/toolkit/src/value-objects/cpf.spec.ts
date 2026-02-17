import { describe, it, expect } from 'vitest';
import { CPF } from './cpf';

describe('CPF', () => {
  it('should create a valid CPF', () => {
    const cpf = CPF.create('529.982.247-25');
    expect(cpf.toString()).toBe('52998224725');
  });

  it('should format CPF', () => {
    const cpf = CPF.create('52998224725');
    expect(cpf.toFormatted()).toBe('529.982.247-25');
  });

  it('should reject invalid CPF', () => {
    expect(() => CPF.create('111.111.111-11')).toThrow('Invalid CPF');
    expect(() => CPF.create('123.456.789-00')).toThrow('Invalid CPF');
    expect(() => CPF.create('123')).toThrow('Invalid CPF');
  });

  it('should validate CPF statically', () => {
    expect(CPF.isValid('529.982.247-25')).toBe(true);
    expect(CPF.isValid('111.111.111-11')).toBe(false);
    expect(CPF.isValid('12345')).toBe(false);
  });

  it('should compare equality', () => {
    const a = CPF.create('529.982.247-25');
    const b = CPF.create('52998224725');
    expect(a.equals(b)).toBe(true);
  });

  it('should serialize to JSON as string', () => {
    const cpf = CPF.create('52998224725');
    expect(cpf.toJSON()).toBe('52998224725');
  });
});
