# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/customer-service/ ./services/customer-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter customer-service...

# Generate Prisma client
RUN pnpm --filter customer-service exec prisma generate

# Build NestJS application
RUN pnpm --filter customer-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/customer-service/dist/ ./services/customer-service/dist/
COPY --from=builder /app/services/customer-service/generated/ ./services/customer-service/generated/
COPY --from=builder /app/services/customer-service/package.json ./services/customer-service/

# Install production dependencies only
RUN pnpm install --filter customer-service --prod

EXPOSE 3001

CMD ["node", "services/customer-service/dist/main.js"]
