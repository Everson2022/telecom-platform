import { describe, it, expect } from 'vitest';
import { Email } from './email';

describe('Email', () => {
  it('should create a valid email', () => {
    const email = Email.create('User@Example.COM');
    expect(email.toString()).toBe('user@example.com');
  });

  it('should get domain', () => {
    const email = Email.create('user@example.com');
    expect(email.getDomain()).toBe('example.com');
  });

  it('should reject invalid email', () => {
    expect(() => Email.create('invalid')).toThrow('Invalid email');
    expect(() => Email.create('no@')).toThrow('Invalid email');
    expect(() => Email.create('@no.com')).toThrow('Invalid email');
  });

  it('should validate statically', () => {
    expect(Email.isValid('user@example.com')).toBe(true);
    expect(Email.isValid('not-an-email')).toBe(false);
  });

  it('should compare equality (case insensitive)', () => {
    const a = Email.create('User@Example.com');
    const b = Email.create('user@example.com');
    expect(a.equals(b)).toBe(true);
  });

  it('should serialize to JSON', () => {
    const email = Email.create('user@example.com');
    expect(email.toJSON()).toBe('user@example.com');
  });
});
