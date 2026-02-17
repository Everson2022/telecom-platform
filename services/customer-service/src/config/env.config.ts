export const envConfig = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/customer_service',
  },
  kafka: {
    clientId: 'customer-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(','),
    groupId: 'customer-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50051', 10),
  },
  serviceName: 'customer-service',
};
