export const envConfig = {
  port: parseInt(process.env.PORT ?? '3003', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/order_service',
  },
  kafka: {
    clientId: 'order-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'order-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50053', 10),
  },
  serviceName: 'order-service',
};
