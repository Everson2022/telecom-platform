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
│   ├── order-service/        # Product Ordering (TMF622) — IMPLEMENTADO
│   ├── payment-service/      # Payment Management (TMF676/666) — IMPLEMENTADO
│   ├── sim-management-service/ # Resource Inventory (TMF639) — IMPLEMENTADO
│   ├── activation-service/   # Service Activation (TMF640) — IMPLEMENTADO
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

------------------------------------------------------------------------

## Principios Arquiteturais

-   Comandos sao assincronos via Kafka
-   Queries entre servicos via gRPC
-   Eventos seguem contrato padrao DomainEvent
-   Outbox Pattern obrigatorio
-   Idempotencia obrigatoria
-   Sagas para fluxos distribuidos
-   Retry + Dead Letter Queue
-   Banco isolado por microsservico

------------------------------------------------------------------------

## Governanca Arquitetural

As regras obrigatorias de implementacao estao organizadas em Skills do
Claude Code:

-   telecom-ddd-layer-enforcer
-   telecom-typescript-strict-guardian
-   telecom-dto-validation-enforcer
-   telecom-event-driven-enforcer
-   telecom-domain-integrity-guardian

Todo codigo gerado deve respeitar as Skills.