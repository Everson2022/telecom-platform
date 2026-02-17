import { DomainEvent } from './domain-event.interface';

export interface EventHandler<T = unknown> {
  eventType: string;
  handle(event: DomainEvent<T>): Promise<void>;
}
