---
compatibility: claude-code
description: Protege integridade do dominio garantindo encapsulamento, invariantes e uso correto de Value Objects.
license: MIT
metadata:
  domain: dominio
  integrity: high
name: telecom-domain-integrity-guardian
user-invokable: false
---

# Objetivo

Preservar regras de negocio e invariantes do dominio.

# Regras Obrigatorias

-   Entidades devem proteger seus invariantes.
-   Value Objects devem ser imutaveis.
-   Construtores devem validar estado inicial.
-   Nenhuma regra critica pode existir fora do dominio.
