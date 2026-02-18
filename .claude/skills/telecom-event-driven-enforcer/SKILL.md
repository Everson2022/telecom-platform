---
compatibility: claude-code
description: Impoe arquitetura event-driven com uso de DomainEvent, Outbox Pattern e idempotencia obrigatoria.
license: MIT
metadata:
  domain: event-driven
  messaging: kafka
name: telecom-event-driven-enforcer
user-invokable: false
---

# Objetivo

Garantir consistencia na comunicacao entre microsservicos via eventos.

# Regras Obrigatorias

-   Todo evento deve implementar DomainEvent.
-   Publicacao via Outbox Pattern obrigatoria.
-   Consumidores devem ser idempotentes.
-   Implementar retry e DLQ.
-   Eventos devem conter correlationId e causationId.
