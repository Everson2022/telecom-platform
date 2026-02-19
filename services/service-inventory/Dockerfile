# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/service-inventory/ ./services/service-inventory/

# Install all dependencies (needed for build)
RUN pnpm install --filter service-inventory...

# Generate Prisma client
RUN pnpm --filter service-inventory exec prisma generate

# Build NestJS application
RUN pnpm --filter service-inventory run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/service-inventory/dist/ ./services/service-inventory/dist/
COPY --from=builder /app/services/service-inventory/generated/ ./services/service-inventory/generated/
COPY --from=builder /app/services/service-inventory/package.json ./services/service-inventory/

# Install production dependencies only
RUN pnpm install --filter service-inventory --prod

EXPOSE 3007

CMD ["node", "services/service-inventory/dist/main.js"]
