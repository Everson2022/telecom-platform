export const envConfig = {
  port: parseInt(process.env.PORT ?? '3005', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/sim_management_service',
  },
  kafka: {
    clientId: 'sim-management-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
    groupId: 'sim-management-service',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT ?? '50055', 10),
  },
  serviceName: 'sim-management-service',
};
