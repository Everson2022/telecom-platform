export const envConfig = {
  port: parseInt(process.env.PORT ?? '3008', 10),
  database: { url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/logistics_service' },
  kafka: { clientId: 'logistics-service', brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','), groupId: 'logistics-service' },
  grpc: { port: parseInt(process.env.GRPC_PORT ?? '50058', 10) },
  serviceName: 'logistics-service',
};
