import { Logger } from '@nestjs/common';
import { DomainEvent } from '../interfaces';
import { KafkaProducerService } from '../services/kafka-producer.service';

export interface RetryConfig {
  maxRetries: number;
  retryDelays: number[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelays: [30_000, 120_000, 600_000],
};

export class KafkaRetryStrategy {
  private readonly logger = new Logger(KafkaRetryStrategy.name);

  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    private readonly config: RetryConfig = DEFAULT_RETRY_CONFIG,
  ) {}

  static getRetryTopic(originalTopic: string, retryNumber: number): string {
    return `${originalTopic}.retry-${retryNumber}`;
  }

  static getDlqTopic(originalTopic: string): string {
    return `${originalTopic}.dlq`;
  }

  async handleFailure(
    originalTopic: string,
    event: DomainEvent,
    currentRetry: number,
    error: Error,
  ): Promise<void> {
    const nextRetry = currentRetry + 1;

    if (nextRetry > this.config.maxRetries) {
      await this.sendToDlq(originalTopic, event, error);
      return;
    }

    const retryTopic = KafkaRetryStrategy.getRetryTopic(originalTopic, nextRetry);

    await this.kafkaProducer.publish({
      topic: retryTopic,
      key: event.aggregateId,
      value: event,
      headers: {
        'x-retry-count': String(nextRetry),
        'x-original-topic': originalTopic,
        'x-error-message': error.message,
      },
    });

    this.logger.warn(
      `Event ${event.eventId} sent to ${retryTopic} (retry ${nextRetry}/${this.config.maxRetries})`,
    );
  }

  private async sendToDlq(
    originalTopic: string,
    event: DomainEvent,
    error: Error,
  ): Promise<void> {
    const dlqTopic = KafkaRetryStrategy.getDlqTopic(originalTopic);

    await this.kafkaProducer.publish({
      topic: dlqTopic,
      key: event.aggregateId,
      value: event,
      headers: {
        'x-original-topic': originalTopic,
        'x-error-message': error.message,
        'x-max-retries-exceeded': 'true',
      },
    });

    this.logger.error(
      `Event ${event.eventId} sent to DLQ ${dlqTopic} after ${this.config.maxRetries} retries`,
    );
  }
}
