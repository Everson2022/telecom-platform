export const envConfig = {
  port: parseInt(process.env.PORT ?? '3007', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/service_inventory',
  },
  kafka: {
    clientId: 'service-inventory',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'service-inventory',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50057', 10),
  },
  serviceName: 'service-inventory',
};
