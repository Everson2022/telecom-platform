export const envConfig = {
  port: parseInt(process.env.PORT ?? '3003', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/payment_service',
  },
  kafka: {
    clientId: 'payment-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'payment-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50053', 10),
  },
  serviceName: 'payment-service',
};
