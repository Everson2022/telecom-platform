export const envConfig = {
  port: parseInt(process.env.PORT ?? '3009', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/billing_service',
  },
  kafka: {
    clientId: 'billing-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'billing-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50059', 10),
  },
  serviceName: 'billing-service',
};
