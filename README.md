# Telecom Platform

Plataforma de microsservicos para operadora de telefonia movel (MVNO) brasileira, construida com foco em boas praticas de arquitetura de software. Projeto de estudo e experimentacao com tecnologias modernas de backend.

> Sem objetivo comercial.

## Sobre o Projeto

Simulacao de uma plataforma real de telecom aderente ao **TM Forum Open Digital Architecture (ODA)**, com arquitetura orientada a eventos, comunicacao assincrona via Kafka e sincronizacao entre servicos via gRPC.

## Conceitos Praticados

| Area | Tecnologias / Padroes |
|---|---|
| Arquitetura | DDD, CQRS, Event-Driven Architecture (EDA), Saga Orquestrada |
| Backend | NestJS 11, TypeScript (strict mode) |
| Banco de dados | PostgreSQL, Prisma ORM |
| Mensageria | Apache Kafka, Outbox Pattern, Idempotencia, Retry com DLQ |
| Comunicacao | gRPC (leitura entre servicos) |
| Resiliencia | Graceful Shutdown, Health Check, Unit of Work |
| Design | Event Storming, Bounded Contexts, Value Objects |
| Testes | Vitest (unit tests) |

## Servicos Implementados

| Servico | Dominio TM Forum | REST | gRPC |
|---|---|---|---|
| `customer-service` | Party Management (TMF632/629) | :3001 | :50051 |
| `catalog-service` | Product Catalog (TMF620) | :3002 | :50052 |

## Estrutura

```
telecom-platform/
├── packages/
│   └── toolkit/          # @telecom/toolkit — biblioteca compartilhada entre servicos
├── services/
│   ├── customer-service/ # Cadastro de clientes, documentos e enderecos
│   └── catalog-service/  # Planos, ofertas e precos por localidade
├── docs/                 # PRDs com requisitos de cada dominio
└── docker-compose.yml    # PostgreSQL + Kafka + Kafka UI
```

## Stack

- **Node.js** 22 LTS
- **NestJS** 11
- **TypeScript** (strict)
- **Prisma** + **PostgreSQL** 16
- **Apache Kafka** 3.8 (KRaft, sem Zookeeper)
- **gRPC** via `@grpc/grpc-js`
- **Vitest**
- **pnpm** workspaces (monorepo)

## Rodando Localmente

```bash
# Subir infraestrutura (PostgreSQL + Kafka + Kafka UI)
docker compose up -d

# Instalar dependencias
pnpm install

# Compilar o toolkit compartilhado
pnpm --filter @telecom/toolkit build

# Rodar um servico em modo desenvolvimento
pnpm --filter customer-service dev
pnpm --filter catalog-service dev
```

Kafka UI disponivel em `http://localhost:8080`.

## Testes

```bash
pnpm --filter customer-service test   # 15 testes
pnpm --filter catalog-service test    # 27 testes
```
