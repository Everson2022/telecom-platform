export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
  ssl?: boolean;
  sasl?: {
    mechanism: 'plain' | 'scram-sha-256' | 'scram-sha-512';
    username: string;
    password: string;
  };
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
