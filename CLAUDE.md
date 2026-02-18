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
│   ├── toolkit/              # @telecom/toolkit — pacote compartilhado
│   └── proto/                # Definicoes Protocol Buffers (futuro)
├── services/
│   ├── customer-service/     # Party Management (TMF632/629) — IMPLEMENTADO
│   ├── catalog-service/      # Product Catalog (TMF620) — IMPLEMENTADO
│   ├── order-service/        # (futuro)
│   ├── payment-service/      # (futuro)
│   ├── sim-management-service/ # (futuro)
│   ├── activation-service/   # (futuro)
│   ├── service-inventory/    # (futuro)
│   ├── billing-service/      # (futuro)
│   ├── logistics-service/    # (futuro)
│   └── locality-service/     # (futuro)
├── docker/
│   └── init-databases.sql    # Cria bancos de todos os servicos
├── docs/
│   ├── PRD-001-plataforma-telecom.md
│   └── PRD-002-health-graceful-shutdown.md
├── docker-compose.yml        # PostgreSQL 16 + Kafka 3.8 + Kafka UI
└── pnpm-workspace.yaml
```

## Comandos Principais

```bash
# Instalar dependencias
pnpm install

# Toolkit
pnpm --filter @telecom/toolkit build     # Compila para dist/
pnpm --filter @telecom/toolkit test      # Roda testes (Vitest)
pnpm --filter @telecom/toolkit dev       # Watch mode

# Customer Service
pnpm --filter customer-service build     # Compila NestJS
pnpm --filter customer-service test      # Roda testes (Vitest)
pnpm --filter customer-service dev       # Watch mode
pnpm --filter customer-service prisma:generate  # Gera Prisma Client
pnpm --filter customer-service prisma:migrate   # Roda migracoes

# Servico generico
pnpm --filter <service-name> build
pnpm --filter <service-name> test
pnpm --filter <service-name> dev

# Docker (infraestrutura local)
docker compose up -d                     # Sobe PostgreSQL + Kafka + Kafka UI
docker compose down                      # Para tudo
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

## Customer Service

Primeiro microsservico implementado. Gerencia cadastro de clientes, documentos e enderecos.

### Endpoints REST (Swagger em `/api/docs`)

| Metodo | Rota | Descricao |
|---|---|---|
| POST | /customers | Cadastra novo cliente |
| GET | /customers/:id | Busca cliente por ID |
| GET | /customers | Lista clientes (paginado) |
| PATCH | /customers/:id | Atualiza dados do cliente |
| POST | /customers/:id/suspend | Suspende cliente |
| POST | /customers/:id/reactivate | Reativa cliente |
| POST | /customers/:id/cancel | Cancela cliente |
| POST | /customers/:id/documents | Adiciona documento |
| PATCH | /customers/:id/documents/:docId/verify | Verifica documento |
| POST | /customers/:id/addresses | Adiciona endereco |

### gRPC (porta 50051)

- GetCustomerById, GetCustomerByCpf, ValidateCustomerExists, GetCustomerAddresses

### Portas padrao

| Servico | REST | gRPC |
|---|---|---|
| customer-service | 3001 | 50051 |
| catalog-service | 3002 | 50052 |
| order-service | 3003 | 50053 |
| payment-service | 3004 | 50054 |

| Infra | Porta |
|---|---|
| PostgreSQL | 5432 |
| Kafka (externo) | 29092 |
| Kafka UI | 8080 |

## Catalog Service

Segundo microsservico implementado. Gerencia planos, ofertas e precos por localidade (TMF620).

### Endpoints REST (Swagger em `/api/docs`)

| Metodo | Rota | Descricao |
|---|---|---|
| POST | /plans | Cria plano |
| GET | /plans | Lista planos (paginado, filtros: status, type, search) |
| GET | /plans/:id | Busca plano por ID |
| PATCH | /plans/:id | Atualiza plano |
| POST | /plans/:id/deprecate | Depreca plano |
| POST | /offers | Cria oferta |
| GET | /offers | Lista ofertas (paginado, filtros: status, planId, search) |
| GET | /offers/:id | Busca oferta por ID |
| POST | /offers/:id/deactivate | Desativa oferta |
| POST | /offers/:offerId/prices | Define preco por localidade (DDD + cidade) |
| GET | /offers/:offerId/prices | Lista precos por localidade |

### gRPC (porta 50052)

- GetPlanById, ListPlans, GetOfferById, GetOfferPriceByLocality, CheckEligibility

### Modelos de Dominio

- **Plan**: tipo (CONTROL/PREPAID/POSTPAID), maxLines, features (PlanFeature)
- **Offer**: vinculada a Plan, preco base, periodo de validade, regras de elegibilidade
- **PriceLocality**: preco por DDD + cidade (override do preco base)
- **EligibilityRule**: regras JSON para verificar elegibilidade do cliente

## Infraestrutura Local (Docker)

- **PostgreSQL 16 Alpine** — um banco por servico (criados via `docker/init-databases.sql`)
- **Apache Kafka 3.8** — KRaft mode (sem Zookeeper), porta externa 29092
- **Kafka UI** — acessivel em `http://localhost:8080`

## Padroes de Servico

- Cada servico tem `.env.example` com as variaveis de ambiente necessarias
- Config centralizada em `src/config/env.config.ts` com defaults para dev local
- Prisma schema em `prisma/schema.prisma` com tabelas de Outbox e ProcessedEvents
- Arquitetura DDD: domain/ → application/ → infrastructure/ → presentation/

## Regras para Desenvolvimento

- Cada microsservico = 1 Bounded Context com banco proprio
- Nunca usar gRPC para alterar estado — apenas Kafka
- Testes com Vitest (>= 80% cobertura)
- Arquivos de teste: `*.spec.ts` ao lado do arquivo fonte ou em `test/`
- Value Objects sao imutaveis (metodos retornam nova instancia)
- Money sempre em centavos (inteiro), nunca float
- CPF sempre validado algoritmicamente
- PRDs seguem nomenclatura `PRD-NNN-descricao.md`

## OBRIGACOES — TypeScript e Arquitetura (SEM EXCECAO)

### PROIBIDO usar `any`
**NUNCA** usar `any` em nenhum arquivo de servico ou toolkit (`.ts`):
- Proibido: `: any`, `as any`, `<any>`
- Usar `unknown` com narrowing quando o tipo nao for conhecido
- Usar `Prisma.InputJsonValue` para campos JSON do Prisma
- Usar `Prisma.TransactionClient` (exportado como `PrismaTransactionClient`) para parametros de transacao
- Usar `Prisma.XxxGetPayload<{ include: ... }>` para entidades com relacoes (ex: `CustomerWithRelations`)
- Usar `Prisma.XxxWhereInput` para filtros de query
- Usar `Prisma.XxxUpdateInput` para dados de atualizacao

### Controllers SEMPRE chamam Use Cases
**NUNCA** injetar Repository diretamente em Controller (REST ou gRPC):
- Controllers REST chamam Commands (escrita) e Queries (leitura)
- Controllers gRPC chamam Queries — sao somente leitura
- Repositories so sao chamados por Commands e Queries (camada application/)
- Exemplo correto: `Controller → GetCustomerQuery → CustomerRepository`
- Exemplo PROIBIDO: `Controller → CustomerRepository` (direto)

### Tipos de dominio para entidades com relacoes
Criar `src/domain/types/index.ts` em cada servico com:
```typescript
export type XxxWithRelations = Prisma.XxxGetPayload<{ include: { relation: true } }>;
```
Retornar sempre o tipo com relacoes nas queries e commands — nunca retornar `any` ou tipo parcial.

### Query Params SEMPRE via DTO validado
**NUNCA** usar `@Query('param') param?: string` solto em controllers para listagens:
- Proibido: `@Query('page') page?: string`, `@Query('status') status?: OfferStatus` sem validacao
- **Obrigatorio:** criar um Query DTO com `class-validator` e usar `@Query() query: ListXxxQueryDto`
- Campos numericos: `@Type(() => Number)` + `@IsInt()` + `@Min(1)` (transforma string da URL para number)
- Campos enum: `@IsEnum(XxxStatus)` com o enum do dominio
- Campos string: `@IsString()` + `@MaxLength()`
- Todos os campos: `@IsOptional()` para query params opcionais
- Exemplo correto:
  ```typescript
  // list-plans-query.dto.ts
  export class ListPlansQueryDto {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number;
    @IsOptional() @IsEnum(PlanStatus) status?: PlanStatus;
    @IsOptional() @IsString() @MaxLength(255) search?: string;
  }
  // plan.controller.ts
  async list(@Query() query: ListPlansQueryDto) { ... }
  ```
- Tambem remover `@ApiQuery` manual — o Swagger le automaticamente do `@ApiProperty` do DTO

### DTOs SEMPRE devem usar enums do dominio
**NUNCA** usar string literals em DTOs para valores que representam enums:
- Proibido: `@IsEnum(['CONTROL', 'PREPAID', 'POSTPAID'])`, `type!: 'ACTIVE' | 'INACTIVE'`, `@ApiProperty({ enum: ['GB', 'MIN'] })`
- **Obrigatorio:** importar e usar os enums de `../../domain/enums` (que re-exportam de `@prisma/client`)
- Exemplo correto:
  ```typescript
  import { PlanType, FeatureUnit } from '../../domain/enums';
  @IsEnum(PlanType)
  type!: PlanType;
  @ApiProperty({ enum: PlanType })
  ```
- Enums ficam em `src/domain/enums/index.ts` e re-exportam do Prisma Client gerado localmente

## Referencia

- PRD principal: `docs/PRD-001-plataforma-telecom.md`
- PRD health/graceful shutdown: `docs/PRD-002-health-graceful-shutdown.md`
