# PRD-004 — Migração de Imports Relativos para Aliases `@/`

**Data:** 2026-02-18
**Status:** Proposto
**Serviços afetados:** `catalog-service`, `customer-service`

---

## 1. Visão Geral

Substituir todos os imports relativos internos (`../../`, `../../../`) dos serviços por
aliases de path tipados e estáveis (`@/domain/enums`, `@/infrastructure/database/prisma.service`).

A resolução em tempo de compilação é feita pelo TypeScript (`paths` no `tsconfig.json`).
A resolução em runtime com o output compilado (`node dist/main`) é feita pelo pacote
`module-alias`, que registra o alias antes do primeiro `require`.

---

## 2. Motivação

### Problema atual

```typescript
// repositories/customer.repository.ts (4 níveis de profundidade)
import { PrismaService } from '../prisma.service';         // ok
import { CustomerWithRelations } from '../../../domain/types'; // frágil
```

- **Fragilidade:** mover qualquer arquivo quebra todos os imports relativos que o referenciam.
- **Legibilidade:** `../../../domain/types` não comunica intenção; `@/domain/types` sim.
- **Refactoring custoso:** IDEs geralmente não atualizam imports relativos automaticamente
  ao mover arquivos em projetos NestJS compilados.

### Solução proposta

```typescript
// Depois
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { CustomerWithRelations } from '@/domain/types';
```

---

## 3. Alias Proposto

| Alias | Resolve em source (`src/`) | Resolve em dist (`dist/`) |
|---|---|---|
| `@/*` | `src/*` | `dist/*` |

**Imports que NÃO mudam** (já são aliases absolutos):
- `@telecom/toolkit`, `@telecom/toolkit/kafka`, etc.
- `@nestjs/*`
- `@prisma/client`

---

## 4. Estado Atual

- Nenhum `module-alias` ou `tsconfig-paths` instalado nos serviços
- `tsconfig.json` de cada serviço define `paths` apenas para `@prisma/client`
- Script de produção: `node dist/main` — sem resolver de path em runtime
- Script dev: `nest start --watch` — NestJS CLI lê `tsconfig.paths` nativamente via `ts-node`
- Profundidade máxima de import relativo: 3 níveis acima (`../../../`)
- Toolkit (`packages/toolkit`): **não afetado** — é uma biblioteca sem entry-point `node dist/main`

---

## 5. Plano de Execução

### Passo 1 — Instalar dependências (por serviço)

```bash
pnpm add module-alias
pnpm add -D @types/module-alias
```

### Passo 2 — Configurar `tsconfig.json` (por serviço)

Adicionar em `compilerOptions.paths`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@prisma/client": ["./generated/prisma"],
      "@/*": ["src/*"]
    }
  }
}
```

### Passo 3 — Configurar `package.json` (por serviço)

Adicionar campo `_moduleAliases` na raiz do `package.json`:

```json
{
  "_moduleAliases": {
    "@": "dist"
  }
}
```

### Passo 4 — Registrar em `main.ts` (por serviço)

`import 'module-alias/register'` **deve ser a primeira linha** do arquivo,
antes de qualquer outro import — inclusive `@nestjs/core`:

```typescript
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
// ...
```

### Passo 5 — Configurar Vitest (por serviço)

Criar `vitest.config.ts` na raiz de cada serviço:

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: false,
  },
});
```

### Passo 6 — Migrar imports

Substituir todos os imports relativos internos por `@/...` em ambos os serviços.

Exemplos de conversão:

| Antes | Depois |
|---|---|
| `'../../domain/enums'` | `'@/domain/enums'` |
| `'../../errors'` | `'@/errors'` |
| `'../prisma.service'` | `'@/infrastructure/database/prisma.service'` |
| `'../../../domain/types'` | `'@/domain/types'` |
| `'../../presentation/dto/...'` | `'@/presentation/dto/...'` |
| `'../database/prisma.service'` | `'@/infrastructure/database/prisma.service'` |

### Passo 7 — Verificação

```bash
# Em cada serviço:
npx tsc --noEmit        # 0 erros de tipo
pnpm lint               # 0 erros ESLint
pnpm test               # todos os testes passando

# Build e start:
pnpm build              # nest build sem erros
node dist/main          # inicia sem MODULE_NOT_FOUND
```

---

## 6. Compatibilidade

| Cenário | Resultado |
|---|---|
| Dev (`nest start --watch`) | NestJS CLI lê `paths` do `tsconfig.json` via `ts-node` — sem alteração necessária |
| Prod (`node dist/main`) | `module-alias/register` resolve `@` → `dist/` antes do primeiro `require` |
| Testes (Vitest) | `vitest.config.ts` com `resolve.alias` resolve `@` → `src/` |
| Dados existentes | Nenhuma mudança — é refactoring puro de import paths |
| Schema Prisma | Não afetado |

---

## 7. Critérios de Aceite

- [ ] Zero imports relativos internos (`../`, `../../`) em `src/` dos dois serviços
- [ ] `tsc --noEmit` passa com 0 erros em ambos os serviços
- [ ] `pnpm lint` passa com 0 erros em ambos os serviços
- [ ] `pnpm test` — todos os testes passando (customer-service: 15, catalog-service: 27)
- [ ] `nest build` compila sem erros
- [ ] `node dist/main` inicia sem `MODULE_NOT_FOUND`
