---
compatibility: claude-code
description: Garante respeito ao DDD, separacao de camadas e isolamento de Bounded Context nos microsservicos.
license: MIT
metadata:
  domain: arquitetura
  pattern: ddd
name: telecom-ddd-layer-enforcer
user-invokable: false
---

# Objetivo

Garantir que cada microsservico respeite:

Controller → Command/Query → Repository\
e mantenha isolamento entre camadas.

# Regras Obrigatorias

-   Nenhum repository pode ser acessado diretamente por controller.
-   Nenhuma regra de negocio pode existir fora da camada `domain`.
-   `application` nao pode depender de `infrastructure`.
-   Cada microsservico deve ser um Bounded Context isolado.
-   Entidades nao podem depender de frameworks.
-   Inversao de dependencia obrigatoria entre camadas.
