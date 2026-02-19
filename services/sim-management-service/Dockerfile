# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/sim-management-service/ ./services/sim-management-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter sim-management-service...

# Generate Prisma client
RUN pnpm --filter sim-management-service exec prisma generate

# Build NestJS application
RUN pnpm --filter sim-management-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/sim-management-service/dist/ ./services/sim-management-service/dist/
COPY --from=builder /app/services/sim-management-service/generated/ ./services/sim-management-service/generated/
COPY --from=builder /app/services/sim-management-service/package.json ./services/sim-management-service/

# Install production dependencies only
RUN pnpm install --filter sim-management-service --prod

EXPOSE 3005

CMD ["node", "services/sim-management-service/dist/main.js"]
