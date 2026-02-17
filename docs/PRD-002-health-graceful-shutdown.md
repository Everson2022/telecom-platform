# PRD — Health Check & Graceful Shutdown

**Versao:** 1.0.0
**Data:** 2026-02-17
**Status:** Planejado

---

## 1. Contexto

Todos os microsservicos da plataforma precisam expor endpoints de health check para orquestradores (Docker, Kubernetes) e implementar graceful shutdown para garantir que conexoes ativas (HTTP, gRPC, Kafka, PostgreSQL) sejam finalizadas corretamente antes do processo encerrar.

Atualmente nenhum servico possui esses mecanismos. Isso impacta:
- **Observabilidade**: sem health check, nao ha como monitorar se um servico esta pronto para receber trafego.
- **Resiliencia**: sem graceful shutdown, deploys causam perda de mensagens Kafka em processamento e requests HTTP interrompidos.

---

## 2. Requisitos

### 2.1 Health Check Endpoints

Cada microsservico deve expor dois endpoints HTTP:

| Endpoint | Proposito | Retorno |
|---|---|---|
| `GET /health/live` | **Liveness** — o processo esta rodando? | `200 OK` se o processo esta vivo |
| `GET /health/ready` | **Readiness** — o servico esta pronto para receber trafego? | `200 OK` se todas as dependencias estao conectadas |

#### Liveness (`/health/live`)

- Retorna `200` se o processo Node.js esta respondendo.
- Nao verifica dependencias externas.
- Usado pelo orquestrador para decidir se deve reiniciar o container.

```json
{
  "status": "alive",
  "timestamp": "2026-02-17T10:00:00Z",
  "service": "customer-service",
  "version": "1.0.0",
  "uptime": 3600
}
```

#### Readiness (`/health/ready`)

- Verifica conexao com cada dependencia do servico.
- Retorna `200` somente se TODAS as dependencias estao saudaveis.
- Retorna `503 Service Unavailable` se alguma falhar.
- Usado pelo orquestrador para decidir se deve rotear trafego para este pod.

```json
{
  "status": "ready",
  "timestamp": "2026-02-17T10:00:00Z",
  "service": "customer-service",
  "checks": {
    "database": { "status": "up", "latencyMs": 2 },
    "kafka": { "status": "up", "latencyMs": 5 },
    "grpc": { "status": "up" }
  }
}
```

Resposta em caso de falha (`503`):

```json
{
  "status": "not_ready",
  "timestamp": "2026-02-17T10:00:00Z",
  "service": "customer-service",
  "checks": {
    "database": { "status": "down", "error": "Connection refused" },
    "kafka": { "status": "up", "latencyMs": 5 },
    "grpc": { "status": "up" }
  }
}
```

#### Checks por Servico

| Servico | Database | Kafka Producer | Kafka Consumer | gRPC Server |
|---|---|---|---|---|
| customer-service | PostgreSQL | Sim | Nao (v1) | Sim |
| catalog-service | PostgreSQL | Sim | Nao (v1) | Sim |
| order-service | PostgreSQL | Sim | Sim | Nao |
| payment-service | PostgreSQL | Sim | Sim | Nao |
| sim-management-service | PostgreSQL | Sim | Sim | Sim |
| activation-service | PostgreSQL | Sim | Sim | Nao |
| service-inventory | PostgreSQL | Sim | Sim | Sim |
| billing-service | PostgreSQL | Sim | Sim | Nao |
| logistics-service | PostgreSQL | Sim | Sim | Sim |
| locality-service | PostgreSQL | Sim | Nao (v1) | Sim |

### 2.2 Graceful Shutdown

Ao receber sinal de encerramento (`SIGTERM`, `SIGINT`), cada servico deve:

1. **Parar de aceitar novas conexoes** (HTTP e gRPC)
2. **Parar Kafka consumers** — commit dos offsets pendentes, parar de consumir
3. **Parar Outbox Processor** — parar o polling
4. **Aguardar requests em andamento** — timeout maximo de 30 segundos
5. **Desconectar Kafka producer** — flush de mensagens pendentes
6. **Desconectar banco** — fechar connection pool do Prisma
7. **Encerrar processo** com exit code 0

#### Sequencia de Shutdown

```
SIGTERM recebido
  |
  v
[1] HTTP server.close() — para de aceitar novas conexoes
[2] gRPC server.tryShutdown() — para de aceitar novas chamadas
[3] KafkaConsumer.disconnect() — commit offsets + stop
[4] OutboxProcessor.stop() — para polling
  |
  v
Aguarda requests em andamento (timeout: 30s)
  |
  v
[5] KafkaProducer.disconnect() — flush + disconnect
[6] PrismaClient.$disconnect() — fecha pool
  |
  v
process.exit(0)
```

#### Timeout de Seguranca

Se o shutdown nao completar em **30 segundos**, o processo deve forcar `process.exit(1)` com log de warning indicando quais recursos nao foram fechados.

### 2.3 Implementacao no Toolkit

Adicionar ao `@telecom/toolkit` os seguintes modulos:

#### `packages/toolkit/src/health/`

```
health/
├── health.module.ts              # Modulo NestJS registravel
├── health.controller.ts          # /health/live e /health/ready
├── interfaces/
│   └── health-indicator.interface.ts  # Contrato para checks
├── indicators/
│   ├── database.indicator.ts     # Check PostgreSQL via Prisma
│   ├── kafka-producer.indicator.ts  # Check Kafka producer
│   ├── kafka-consumer.indicator.ts  # Check Kafka consumer
│   └── grpc.indicator.ts         # Check gRPC server
└── index.ts
```

**Interface base:**

```typescript
export interface HealthIndicator {
  name: string;
  check(): Promise<HealthCheckResult>;
}

export interface HealthCheckResult {
  status: 'up' | 'down';
  latencyMs?: number;
  error?: string;
}
```

**Uso nos servicos:**

```typescript
import { HealthModule } from '@telecom/toolkit/health';

@Module({
  imports: [
    HealthModule.register({
      serviceName: 'customer-service',
      version: '1.0.0',
      indicators: [
        new DatabaseHealthIndicator(prismaService),
        new KafkaProducerHealthIndicator(kafkaProducer),
      ],
    }),
  ],
})
export class AppModule {}
```

#### `packages/toolkit/src/shutdown/`

```
shutdown/
├── graceful-shutdown.service.ts  # Orquestra a sequencia de shutdown
├── interfaces/
│   └── shutdownable.interface.ts # Contrato para recursos que precisam fechar
└── index.ts
```

**Interface:**

```typescript
export interface Shutdownable {
  name: string;
  shutdown(): Promise<void>;
}
```

**Uso nos servicos:**

```typescript
import { GracefulShutdownService } from '@telecom/toolkit/shutdown';

const shutdownService = new GracefulShutdownService({
  timeoutMs: 30000,
  resources: [
    { name: 'kafka-consumer', shutdown: () => consumer.disconnect() },
    { name: 'outbox-processor', shutdown: () => outboxProcessor.stop() },
    { name: 'kafka-producer', shutdown: () => producer.disconnect() },
    { name: 'database', shutdown: () => prisma.$disconnect() },
  ],
});
```

### 2.4 Docker Compose

Atualizar `docker-compose.yml` quando os servicos forem containerizados:

```yaml
services:
  customer-service:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health/live"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    stop_grace_period: 35s  # > timeout de shutdown (30s)
```

---

## 3. Requisitos Nao-Funcionais

| Requisito | Meta |
|---|---|
| Latencia do `/health/live` | < 5ms |
| Latencia do `/health/ready` | < 100ms |
| Timeout de shutdown | 30s (configuravel) |
| Shutdown sem perda de mensagens Kafka | 100% (offsets committed antes de desconectar) |
| Shutdown sem requests HTTP cortados | 100% (aguarda requests em andamento) |

---

## 4. Criterios de Aceitacao

- [ ] Todos os servicos expoe `/health/live` e `/health/ready`
- [ ] `/health/ready` retorna `503` quando banco ou Kafka esta inacessivel
- [ ] `SIGTERM` dispara shutdown ordenado sem perda de dados
- [ ] Timeout de 30s forca encerramento se shutdown travar
- [ ] Outbox processor para de publicar antes do Kafka producer desconectar
- [ ] Kafka consumer faz commit de offsets antes de desconectar
- [ ] Health indicators implementados no toolkit como modulo reutilizavel
- [ ] Testes unitarios para cada health indicator
- [ ] Teste de integracao: shutdown com requests em andamento completa sem erro

---

## 5. Prioridade e Dependencias

**Prioridade:** Media — implementar antes de ir para producao, pode ser apos os servicos core estarem funcionais.

**Dependencias:**
- Toolkit (`@telecom/toolkit`) ja implementado
- Pelo menos 1 servico funcional para validar (customer-service)
- Docker Compose com PostgreSQL e Kafka operacionais

**Ordem de implementacao sugerida:**
1. Health indicators no toolkit
2. GracefulShutdownService no toolkit
3. Integrar no customer-service como piloto
4. Replicar para os demais servicos
