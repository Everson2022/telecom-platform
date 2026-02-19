import { v7 as uuidv7 } from 'uuid';
import { DomainEvent } from '../interfaces';

export interface CreateDomainEventParams<T> {
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  source: string;
  payload: T;
  correlationId?: string;
  causationId?: string;
  version?: number;
  metadata?: Record<string, string>;
}

export class DomainEventFactory {
  static create<T>(params: CreateDomainEventParams<T>): DomainEvent<T> {
    const eventId = uuidv7();
    return {
      eventId,
      eventType: params.eventType,
      aggregateId: params.aggregateId,
      aggregateType: params.aggregateType,
      version: params.version ?? 1,
      timestamp: new Date().toISOString(),
      correlationId: params.correlationId ?? uuidv7(),
      causationId: params.causationId ?? eventId,
      source: params.source,
      payload: params.payload,
      metadata: params.metadata ?? {},
    };
  }
}
