import { Injectable, Logger } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';

export interface OutboxEvent {
  id: string;
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: Record<string, unknown>;
  correlationId: string | null;
  causationId: string | null;
  status: string;
  retryCount: number;
  createdAt: Date;
  publishedAt: Date | null;
}

export interface OutboxStore {
  findPendingEvents(batchSize: number): Promise<OutboxEvent[]>;
  markAsPublished(id: string): Promise<void>;
  incrementRetry(id: string): Promise<void>;
  markAsFailed(id: string): Promise<void>;
}

@Injectable()
export class OutboxProcessorService {
  private readonly logger = new Logger(OutboxProcessorService.name);
  private intervalRef: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly outboxStore: OutboxStore,
    private readonly kafkaProducer: KafkaProducerService,
    private readonly serviceName: string,
    private readonly pollingIntervalMs: number = 1000,
    private readonly batchSize: number = 100,
    private readonly maxRetries: number = 5,
  ) {}

  start(): void {
    this.intervalRef = setInterval(() => {
      this.processOutbox().catch((err) =>
        this.logger.error('Outbox processing error', err),
      );
    }, this.pollingIntervalMs);
    this.logger.log(`Outbox processor started (interval: ${this.pollingIntervalMs}ms)`);
  }

  stop(): void {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
      this.logger.log('Outbox processor stopped');
    }
  }

  async processOutbox(): Promise<number> {
    const events = await this.outboxStore.findPendingEvents(this.batchSize);
    if (events.length === 0) return 0;

    let published = 0;

    for (const event of events) {
      try {
        const topic = event.eventType;

        await this.kafkaProducer.publish({
          topic,
          key: event.aggregateId,
          value: {
            eventId: event.id,
            eventType: event.eventType,
            aggregateId: event.aggregateId,
            aggregateType: event.aggregateType,
            version: 1,
            timestamp: event.createdAt.toISOString(),
            correlationId: event.correlationId ?? event.id,
            causationId: event.causationId ?? event.id,
            source: this.serviceName,
            payload: event.payload,
            metadata: {},
          },
        });

        await this.outboxStore.markAsPublished(event.id);
        published++;
      } catch (error) {
        this.logger.error(`Failed to publish outbox event ${event.id}`, error);

        if (event.retryCount >= this.maxRetries) {
          await this.outboxStore.markAsFailed(event.id);
          this.logger.warn(`Outbox event ${event.id} exceeded max retries, marked as FAILED`);
        } else {
          await this.outboxStore.incrementRetry(event.id);
        }
      }
    }

    if (published > 0) {
      this.logger.debug(`Published ${published}/${events.length} outbox events`);
    }

    return published;
  }
}
