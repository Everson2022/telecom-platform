export const envConfig = {
  port: parseInt(process.env.PORT ?? '3010', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/locality_service',
  },
  kafka: {
    clientId: 'locality-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'locality-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50060', 10),
  },
  serviceName: 'locality-service',
};
