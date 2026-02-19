# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/payment-service/ ./services/payment-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter payment-service...

# Generate Prisma client
RUN pnpm --filter payment-service exec prisma generate

# Build NestJS application
RUN pnpm --filter payment-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/payment-service/dist/ ./services/payment-service/dist/
COPY --from=builder /app/services/payment-service/generated/ ./services/payment-service/generated/
COPY --from=builder /app/services/payment-service/package.json ./services/payment-service/

# Install production dependencies only
RUN pnpm install --filter payment-service --prod

EXPOSE 3004

CMD ["node", "services/payment-service/dist/main.js"]
