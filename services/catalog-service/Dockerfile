# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/catalog-service/ ./services/catalog-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter catalog-service...

# Generate Prisma client
RUN pnpm --filter catalog-service exec prisma generate

# Build NestJS application
RUN pnpm --filter catalog-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/catalog-service/dist/ ./services/catalog-service/dist/
COPY --from=builder /app/services/catalog-service/generated/ ./services/catalog-service/generated/
COPY --from=builder /app/services/catalog-service/package.json ./services/catalog-service/

# Install production dependencies only
RUN pnpm install --filter catalog-service --prod

EXPOSE 3002

CMD ["node", "services/catalog-service/dist/main.js"]
