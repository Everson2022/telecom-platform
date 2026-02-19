# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/billing-service/ ./services/billing-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter billing-service...

# Generate Prisma client
RUN pnpm --filter billing-service exec prisma generate

# Build NestJS application
RUN pnpm --filter billing-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/billing-service/dist/ ./services/billing-service/dist/
COPY --from=builder /app/services/billing-service/generated/ ./services/billing-service/generated/
COPY --from=builder /app/services/billing-service/package.json ./services/billing-service/

# Install production dependencies only
RUN pnpm install --filter billing-service --prod

EXPOSE 3009

CMD ["node", "services/billing-service/dist/main.js"]
