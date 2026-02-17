export const envConfig = {
  port: parseInt(process.env.PORT ?? '3002', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/catalog_service',
  },
  kafka: {
    clientId: 'catalog-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'catalog-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50052', 10),
  },
  serviceName: 'catalog-service',
};
