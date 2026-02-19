# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/activation-service/ ./services/activation-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter activation-service...

# Generate Prisma client
RUN pnpm --filter activation-service exec prisma generate

# Build NestJS application
RUN pnpm --filter activation-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/activation-service/dist/ ./services/activation-service/dist/
COPY --from=builder /app/services/activation-service/generated/ ./services/activation-service/generated/
COPY --from=builder /app/services/activation-service/package.json ./services/activation-service/

# Install production dependencies only
RUN pnpm install --filter activation-service --prod

EXPOSE 3006

CMD ["node", "services/activation-service/dist/main.js"]
