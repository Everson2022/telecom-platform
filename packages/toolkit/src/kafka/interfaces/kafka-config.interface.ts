import type { SASLOptions } from 'kafkajs';

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
  ssl?: boolean;
  sasl?: SASLOptions;
  retry?: {
    maxRetries: number;
    retryDelays: number[];
  };
}

export interface KafkaProducerConfig {
  allowAutoTopicCreation?: boolean;
  transactionalId?: string;
  idempotent?: boolean;
}

export interface KafkaConsumerConfig {
  groupId: string;
  sessionTimeout?: number;
  heartbeatInterval?: number;
  maxBytesPerPartition?: number;
  fromBeginning?: boolean;
}
