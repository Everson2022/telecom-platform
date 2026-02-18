import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { DomainEvent, EventEnvelope, KafkaConfig, KafkaProducerConfig } from '../interfaces';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private kafka: Kafka;

  constructor(
    private readonly config: KafkaConfig,
    private readonly producerConfig?: KafkaProducerConfig,
  ) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
      ssl: config.ssl,
      sasl: config.sasl,
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: producerConfig?.allowAutoTopicCreation ?? false,
      transactionalId: producerConfig?.transactionalId,
      idempotent: producerConfig?.idempotent ?? true,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
    this.logger.log('Kafka producer connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
  }

  async publish(envelope: EventEnvelope): Promise<void> {
    const record: ProducerRecord = {
      topic: envelope.topic,
      messages: [
        {
          key: envelope.key,
          value: JSON.stringify(envelope.value),
          headers: {
            eventType: envelope.value.eventType,
            eventId: envelope.value.eventId,
            correlationId: envelope.value.correlationId,
            source: envelope.value.source,
            ...envelope.headers,
          },
        },
      ],
    };

    await this.producer.send(record);
    this.logger.debug(
      `Published event ${envelope.value.eventType} to ${envelope.topic} [key=${envelope.key}]`,
    );
  }

  async publishBatch(envelopes: EventEnvelope[]): Promise<void> {
    const topicMessages = envelopes.map((envelope) => ({
      topic: envelope.topic,
      messages: [
        {
          key: envelope.key,
          value: JSON.stringify(envelope.value),
          headers: {
            eventType: envelope.value.eventType,
            eventId: envelope.value.eventId,
            correlationId: envelope.value.correlationId,
            source: envelope.value.source,
            ...envelope.headers,
          },
        },
      ],
    }));

    await this.producer.sendBatch({ topicMessages });
    this.logger.debug(`Published batch of ${envelopes.length} events`);
  }

  async publishDomainEvent(topic: string, event: DomainEvent): Promise<void> {
    await this.publish({
      topic,
      key: event.aggregateId,
      value: event,
    });
  }
}
