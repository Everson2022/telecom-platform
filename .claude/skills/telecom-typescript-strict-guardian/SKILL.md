---
compatibility: claude-code
description: Impoe uso de TypeScript strict mode, tipagem explicita e proibicao de any.
license: MIT
metadata:
  domain: typescript
  strictness: max
name: telecom-typescript-strict-guardian
user-invokable: false
---

# Objetivo

Garantir qualidade maxima de tipagem.

# Regras Obrigatorias

-   strict: true no tsconfig.
-   Proibido uso de any.
-   Todas as funcoes devem possuir tipo de retorno explicito.
-   DTOs devem ser tipados.
-   Nunca usar inferencia implicita em APIs publicas.
