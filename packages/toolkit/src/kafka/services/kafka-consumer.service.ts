import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, EachMessagePayload } from 'kafkajs';
import { DomainEvent, EventHandler, KafkaConfig, KafkaConsumerConfig } from '../interfaces';
import { IdempotencyService } from './idempotency.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private consumer: Consumer;
  private kafka: Kafka;
  private readonly handlers = new Map<string, EventHandler>();
  private topics: string[] = [];

  constructor(
    private readonly config: KafkaConfig,
    private readonly consumerConfig: KafkaConsumerConfig,
    private readonly idempotencyService?: IdempotencyService,
  ) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
      ssl: config.ssl,
      sasl: config.sasl,
    });

    this.consumer = this.kafka.consumer({
      groupId: consumerConfig.groupId,
      sessionTimeout: consumerConfig.sessionTimeout ?? 30000,
      heartbeatInterval: consumerConfig.heartbeatInterval ?? 3000,
      maxBytesPerPartition: consumerConfig.maxBytesPerPartition,
    });
  }

  registerHandler(handler: EventHandler): void {
    this.handlers.set(handler.eventType, handler);
    this.logger.log(`Registered handler for event type: ${handler.eventType}`);
  }

  subscribe(topics: string[]): void {
    this.topics = topics;
  }

  async onModuleInit(): Promise<void> {
    await this.consumer.connect();
    this.logger.log('Kafka consumer connected');

    for (const topic of this.topics) {
      await this.consumer.subscribe({
        topic,
        fromBeginning: this.consumerConfig.fromBeginning ?? false,
      });
    }

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        await this.handleMessage(payload);
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer disconnected');
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;

    if (!message.value) {
      this.logger.warn(`Empty message received on ${topic}:${partition}`);
      return;
    }

    let event: DomainEvent;
    try {
      event = JSON.parse(message.value.toString()) as DomainEvent;
    } catch (error) {
      this.logger.error(`Failed to parse message on ${topic}:${partition}`, error);
      return;
    }

    if (this.idempotencyService) {
      const alreadyProcessed = await this.idempotencyService.isProcessed(event.eventId);
      if (alreadyProcessed) {
        this.logger.debug(`Event ${event.eventId} already processed, skipping`);
        return;
      }
    }

    const handler = this.handlers.get(event.eventType);
    if (!handler) {
      this.logger.debug(`No handler for event type: ${event.eventType}`);
      return;
    }

    try {
      await handler.handle(event);

      if (this.idempotencyService) {
        await this.idempotencyService.markAsProcessed(event.eventId, event.eventType);
      }

      this.logger.debug(
        `Processed event ${event.eventType} [${event.eventId}] from ${topic}:${partition}`,
      );
    } catch (error) {
      this.logger.error(
        `Error processing event ${event.eventType} [${event.eventId}]`,
        error,
      );
      throw error;
    }
  }
}
