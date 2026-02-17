export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  version: number;
  timestamp: string;
  correlationId: string;
  causationId: string;
  source: string;
  payload: T;
  metadata: Record<string, string>;
}

export interface EventEnvelope {
  key: string;
  value: DomainEvent;
  topic: string;
  headers?: Record<string, string>;
}
