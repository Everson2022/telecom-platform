# CLAUDE.md — Telecom Platform

## Visao Geral

Plataforma de microsservicos para operadora de telefonia movel (ou MVNO) brasileira, aderente ao TM Forum Open Digital Architecture (ODA). Arquitetura event-driven com DDD, Sagas orquestradas e Outbox Pattern.

## Stack

- **Runtime:** Node.js 22 LTS
- **Framework:** NestJS 11
- **Linguagem:** TypeScript (strict mode)
- **ORM:** Prisma
- **Banco:** PostgreSQL (um banco por servico)
- **Mensageria:** Apache Kafka (kafkajs)
- **gRPC:** @grpc/grpc-js + Protocol Buffers
- **Testes:** Vitest
- **Monorepo:** pnpm workspaces

## Estrutura do Monorepo

```
telecom-platform/
├── packages/
│   ├── toolkit/          # @telecom/toolkit — pacote compartilhado
│   └── proto/            # Definicoes Protocol Buffers (futuro)
├── services/             # Microsservicos (futuro)
│   ├── customer-service/
│   ├── catalog-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── sim-management-service/
│   ├── activation-service/
│   ├── service-inventory/
│   ├── billing-service/
│   ├── logistics-service/
│   └── locality-service/
├── docs/PRD.md           # Documento de requisitos completo
├── pnpm-workspace.yaml
└── docker-compose.yml    # (futuro)
```

## Comandos Principais

```bash
# Instalar dependencias
pnpm install

# Toolkit
pnpm --filter @telecom/toolkit build     # Compila para dist/
pnpm --filter @telecom/toolkit test      # Roda testes (Vitest)
pnpm --filter @telecom/toolkit dev       # Watch mode

# Servico especifico (quando existirem)
pnpm --filter <service-name> build
pnpm --filter <service-name> test
pnpm --filter <service-name> dev
```

## Toolkit (@telecom/toolkit)

Pacote compartilhado importado por todos os microsservicos via `"@telecom/toolkit": "workspace:*"`.

### Modulos

| Modulo | Import | Conteudo |
|---|---|---|
| kafka | `@telecom/toolkit/kafka` | DomainEvent, KafkaProducer/Consumer, OutboxProcessor, IdempotencyService, KafkaRetryStrategy |
| database | `@telecom/toolkit/database` | PrismaUnitOfWork, OutboxRepository, BaseRepository |
| saga | `@telecom/toolkit/saga` | SagaOrchestrator (com compensacao), SagaStepDefinition, SagaExecutionRepository |
| grpc | `@telecom/toolkit/grpc` | GrpcLoggingInterceptor, GrpcErrorMappingInterceptor |
| value-objects | `@telecom/toolkit/value-objects` | Money, CPF, Email, PhoneNumber |

### Interface DomainEvent (contrato central)

Todos os eventos Kafka seguem esta estrutura:

```typescript
interface DomainEvent<T = unknown> {
  eventId: string;          // UUID v4 — chave de idempotencia
  eventType: string;        // ex: "customer.registered"
  aggregateId: string;      // ID do agregado
  aggregateType: string;    // ex: "Customer"
  version: number;          // versao do schema
  timestamp: string;        // ISO 8601
  correlationId: string;    // rastreamento distribuido
  causationId: string;      // eventId causador
  source: string;           // servico emissor
  payload: T;
  metadata: Record<string, string>;
}
```

## Principios Arquiteturais

- **Kafka para comandos** (altera estado), **gRPC apenas para queries** (leitura)
- **Outbox Pattern:** evento persistido na mesma transacao do agregado (Unit of Work)
- **Idempotencia:** todo consumidor Kafka deduplica via `eventId`
- **Saga orquestrada:** compensacao reversa em caso de falha
- **Retry + DLQ:** 3 retries (30s, 2min, 10min), depois Dead Letter Queue

## Convencoes

| Elemento | Padrao | Exemplo |
|---|---|---|
| Servico | kebab-case | `customer-service` |
| Topico Kafka | dot-separated | `customer.registered` |
| Retry topic | `.retry-N` | `customer.registered.retry-1` |
| DLQ topic | `.dlq` | `customer.registered.dlq` |
| Tabela PostgreSQL | snake_case plural | `customers` |
| Coluna PostgreSQL | snake_case | `created_at` |
| Classe TypeScript | PascalCase | `CustomerRegisteredEvent` |
| Variavel/metodo | camelCase | `processPayment()` |
| Proto package | lowercase | `customer`, `common` |
| Proto service | PascalCase + QueryService | `CustomerQueryService` |

## Regras para Desenvolvimento

- Cada microsservico = 1 Bounded Context com banco proprio
- Nunca usar gRPC para alterar estado — apenas Kafka
- Testes com Vitest (>= 80% cobertura)
- Arquivos de teste: `*.spec.ts` ao lado do arquivo fonte
- Value Objects sao imutaveis (metodos retornam nova instancia)
- Money sempre em centavos (inteiro), nunca float
- CPF sempre validado algoritmicamente

## Referencia

- PRD completo com todos os fluxos, sagas e schemas: `docs/PRD.md`
