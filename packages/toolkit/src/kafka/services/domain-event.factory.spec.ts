import { describe, it, expect, vi } from 'vitest';
import { DomainEventFactory } from './domain-event.factory';

vi.mock('uuid', () => ({
  v7: () => 'test-uuid-1234',
}));

describe('DomainEventFactory', () => {
  it('should create a domain event with all fields', () => {
    const event = DomainEventFactory.create({
      eventType: 'customer.registered',
      aggregateId: 'customer-123',
      aggregateType: 'Customer',
      source: 'customer-service',
      payload: { fullName: 'John Doe', cpf: '12345678901' },
    });

    expect(event.eventId).toBe('test-uuid-1234');
    expect(event.eventType).toBe('customer.registered');
    expect(event.aggregateId).toBe('customer-123');
    expect(event.aggregateType).toBe('Customer');
    expect(event.version).toBe(1);
    expect(event.source).toBe('customer-service');
    expect(event.payload).toEqual({ fullName: 'John Doe', cpf: '12345678901' });
    expect(event.correlationId).toBeDefined();
    expect(event.causationId).toBe('test-uuid-1234');
    expect(event.timestamp).toBeDefined();
    expect(event.metadata).toEqual({});
  });

  it('should use provided correlationId and causationId', () => {
    const event = DomainEventFactory.create({
      eventType: 'order.created',
      aggregateId: 'order-1',
      aggregateType: 'Order',
      source: 'order-service',
      payload: {},
      correlationId: 'corr-123',
      causationId: 'cause-456',
    });

    expect(event.correlationId).toBe('corr-123');
    expect(event.causationId).toBe('cause-456');
  });

  it('should use provided version and metadata', () => {
    const event = DomainEventFactory.create({
      eventType: 'sim.allocated',
      aggregateId: 'sim-1',
      aggregateType: 'SimCard',
      source: 'sim-management-service',
      payload: {},
      version: 2,
      metadata: { userId: 'user-1' },
    });

    expect(event.version).toBe(2);
    expect(event.metadata).toEqual({ userId: 'user-1' });
  });
});
