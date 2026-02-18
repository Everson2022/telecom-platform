# PRD-003 — Migração de UUIDv4 para UUIDv7

## Visão Geral

Este documento descreve a migração da geração de identificadores únicos de **UUIDv4** (aleatório)
para **UUIDv7** (time-ordered) em todos os microsserviços da plataforma.

UUIDv7 é definido pela RFC 9562 e combina um timestamp de 48 bits (milissegundos Unix) com bits
aleatórios, gerando UUIDs monotonicamente crescentes dentro do mesmo milissegundo.

---

## Motivação Técnica

### 1. Performance em índices PostgreSQL

UUIDs v4 são completamente aleatórios, causando **fragmentação de índice B-tree**: cada novo
registro é inserido em uma posição aleatória da árvore, forçando rebalanceamentos constantes e
aumentando o número de page splits.

UUIDs v7 são sempre maiores que os anteriores, garantindo **inserções sequenciais no índice** —
o mesmo comportamento de um `BIGSERIAL`, sem abrir mão da unicidade global (sem coordenação
entre serviços).

### 2. Ordenação natural por tempo

Com UUIDv4, ordenar registros por `id` não tem significado. Com UUIDv7, `ORDER BY id` equivale
aproximadamente a `ORDER BY created_at`, sem custo de coluna extra. Útil nas tabelas `outbox_events`
e `processed_events` que são consultadas frequentemente por ordem de criação.

### 3. Alinhamento com o Outbox Pattern

O `outbox-repository.ts` do toolkit gera IDs para eventos de outbox. Eventos UUIDv7 ficam
naturalmente ordenados por tempo de criação, facilitando o consumo sequencial pelo
`OutboxProcessor` e a depuração de fluxos de saga.

### 4. Sem custo de migração

A biblioteca `uuid@11.1.0` (já instalada em todos os pacotes) suporta v7 nativamente. A mudança
é apenas no import e no nome da função — a API é idêntica à do v4.

---

## Escopo

### Pacotes afetados

| Pacote | Arquivos |
|---|---|
| `@telecom/toolkit` | 2 arquivos |
| `catalog-service` | 4 arquivos |
| `customer-service` | 3 arquivos |

### Arquivos a modificar (9 no total)

#### @telecom/toolkit

| Arquivo | Uso atual |
|---|---|
| `packages/toolkit/src/database/outbox-repository.ts` | ID do evento de outbox |
| `packages/toolkit/src/kafka/services/domain-event.factory.ts` | `eventId` e `correlationId` dos eventos Kafka |

#### catalog-service

| Arquivo | Uso atual |
|---|---|
| `services/catalog-service/src/application/commands/create-plan.command.ts` | `planId`, IDs de `PlanFeature` |
| `services/catalog-service/src/application/commands/create-offer.command.ts` | `offerId`, IDs de `EligibilityRule` |
| `services/catalog-service/src/application/commands/update-plan.command.ts` | IDs de `PlanFeature` (recriação) |
| `services/catalog-service/src/application/commands/set-locality-price.command.ts` | ID de `PriceLocality` |

#### customer-service

| Arquivo | Uso atual |
|---|---|
| `services/customer-service/src/application/commands/register-customer.command.ts` | `customerId`, IDs de documentos e endereços |
| `services/customer-service/src/application/commands/add-address.command.ts` | `addressId` |
| `services/customer-service/src/application/commands/add-document.command.ts` | `documentId` |

---

## Pré-requisitos

- `uuid@^11.0.0` já declarado como dependência em `toolkit`, `customer-service` e `catalog-service`
- Versão instalada: `11.1.0` — suporte nativo a UUIDv7 incluído
- Nenhuma atualização de pacote necessária

---

## Plano de Execução

### Passo 1 — Toolkit

Atualizar os 2 arquivos do toolkit:

```typescript
// Antes
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();

// Depois
import { v7 as uuidv7 } from 'uuid';
const id = uuidv7();
```

Recompilar o toolkit após a mudança:
```bash
pnpm --filter @telecom/toolkit build
```

### Passo 2 — catalog-service

Atualizar os 4 arquivos de commands. Mesma mecânica de substituição de import e nome de função.

### Passo 3 — customer-service

Atualizar os 3 arquivos de commands.

### Passo 4 — Testes

Nos arquivos `*.spec.ts` que mockam `uuidv4`, substituir pela versão v7:

```typescript
// Antes
vi.mock('uuid', () => ({ v4: vi.fn(() => 'test-uuid') }));

// Depois
vi.mock('uuid', () => ({ v7: vi.fn(() => 'test-uuid') }));
```

### Passo 5 — Verificação

```bash
pnpm --filter @telecom/toolkit test
pnpm --filter customer-service test
pnpm --filter catalog-service test
```

---

## Compatibilidade

### Schema PostgreSQL

Colunas do tipo `UUID` no PostgreSQL armazenam 128 bits sem interpretar a versão. Um valor UUIDv7
é armazenado e consultado exatamente igual a um UUIDv4. **Nenhuma migração de schema é necessária.**

### Dados existentes

Registros já persistidos com IDs UUIDv4 continuam válidos. A migração é progressiva — novos
registros passam a usar v7, os existentes permanecem com v4. Não há conflito de unicidade.

### Formato de saída

UUIDv7 mantém o formato padrão `xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx` (36 caracteres com hífens),
compatível com qualquer validação `@IsUUID()` dos DTOs e com os campos `UUID` do Prisma.

---

## Critérios de Aceite

- [ ] Nenhuma ocorrência de `uuidv4` ou `v4 as uuidv4` permanece nos 9 arquivos listados
- [ ] Todos os testes do toolkit, customer-service e catalog-service passam sem alteração de comportamento
- [ ] IDs gerados em runtime seguem o formato UUID padrão (36 chars, grupos separados por hífen)
- [ ] Os primeiros 13 caracteres de IDs gerados em sequência são monotonicamente crescentes
- [ ] CLAUDE.md atualizado com a decisão de usar UUIDv7

---

## Referências

- RFC 9562 — UUIDs: https://www.rfc-editor.org/rfc/rfc9562
- uuid npm package v11: https://github.com/uuidjs/uuid
- PRD principal: `docs/PRD-001-plataforma-telecom.md`
