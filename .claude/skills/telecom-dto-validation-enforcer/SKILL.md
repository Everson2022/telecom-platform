---
compatibility: claude-code
description: Obriga validacao de DTOs utilizando class-validator e separacao clara entre DTO e entidade de dominio.
license: MIT
metadata:
  domain: validacao
  framework: nestjs
name: telecom-dto-validation-enforcer
user-invokable: false
---

# Objetivo

Garantir validacao consistente de entrada de dados.

# Regras Obrigatorias

-   Todo DTO deve usar class-validator.
-   DTO nunca deve conter regra de negocio.
-   Entidades de dominio nao devem usar decorators de framework.
-   Mapeamento DTO → Domain deve ser explicito.
