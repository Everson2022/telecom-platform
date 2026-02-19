export const envConfig = {
  port: parseInt(process.env.PORT ?? '3006', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/activation_service',
  },
  kafka: {
    clientId: 'activation-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'activation-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50056', 10),
  },
  serviceName: 'activation-service',
};
