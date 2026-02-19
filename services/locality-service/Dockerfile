# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/locality-service/ ./services/locality-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter locality-service...

# Generate Prisma client
RUN pnpm --filter locality-service exec prisma generate

# Build NestJS application
RUN pnpm --filter locality-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/locality-service/dist/ ./services/locality-service/dist/
COPY --from=builder /app/services/locality-service/generated/ ./services/locality-service/generated/
COPY --from=builder /app/services/locality-service/package.json ./services/locality-service/

# Install production dependencies only
RUN pnpm install --filter locality-service --prod

EXPOSE 3010

CMD ["node", "services/locality-service/dist/main.js"]
