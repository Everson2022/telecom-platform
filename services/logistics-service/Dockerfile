# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/ ./packages/
COPY services/logistics-service/ ./services/logistics-service/

# Install all dependencies (needed for build)
RUN pnpm install --filter logistics-service...

# Generate Prisma client
RUN pnpm --filter logistics-service exec prisma generate

# Build NestJS application
RUN pnpm --filter logistics-service run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json /app/tsconfig.json ./
COPY --from=builder /app/packages/ ./packages/

# Copy built artifacts and generated files
COPY --from=builder /app/services/logistics-service/dist/ ./services/logistics-service/dist/
COPY --from=builder /app/services/logistics-service/generated/ ./services/logistics-service/generated/
COPY --from=builder /app/services/logistics-service/package.json ./services/logistics-service/

# Install production dependencies only
RUN pnpm install --filter logistics-service --prod

EXPOSE 3008

CMD ["node", "services/logistics-service/dist/main.js"]
