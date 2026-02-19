# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/order-service/ ./services/order-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter order-service...

# Generate Prisma client
RUN pnpm --filter order-service exec prisma generate

# Build NestJS application
RUN pnpm --filter order-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/order-service/dist/ ./services/order-service/dist/
COPY --from=builder /app/services/order-service/generated/ ./services/order-service/generated/
COPY --from=builder /app/services/order-service/package.json ./services/order-service/

# Install production dependencies only
RUN pnpm install --filter order-service --prod

EXPOSE 3003

CMD ["node", "services/order-service/dist/main.js"]
