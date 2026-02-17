import { v4 as uuidv4 } from 'uuid';
import { PrismaTransaction } from './unit-of-work';

export interface CreateOutboxEventParams {
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: Record<string, unknown>;
  correlationId?: string;
  causationId?: string;
}

export interface OutboxEventRecord {
  id: string;
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: unknown;
  correlationId: string | null;
  causationId: string | null;
  status: string;
  retryCount: number;
  createdAt: Date;
  publishedAt: Date | null;
}

export interface OutboxPrismaClient {
  outboxEvent: {
    create(args: { data: Record<string, unknown> }): Promise<unknown>;
    findMany(args: {
      where: Record<string, unknown>;
      orderBy: Record<string, unknown>;
      take: number;
    }): Promise<OutboxEventRecord[]>;
    update(args: {
      where: { id: string };
      data: Record<string, unknown>;
    }): Promise<unknown>;
  };
}

export class OutboxRepository {
  async create(tx: PrismaTransaction, params: CreateOutboxEventParams): Promise<string> {
    const id = uuidv4();
    await tx.outboxEvent.create({
      data: {
        id,
        aggregateId: params.aggregateId,
        aggregateType: params.aggregateType,
        eventType: params.eventType,
        payload: params.payload,
        correlationId: params.correlationId ?? null,
        causationId: params.causationId ?? null,
        status: 'PENDING',
        retryCount: 0,
      },
    });
    return id;
  }

  async findPending(prisma: OutboxPrismaClient, batchSize: number): Promise<OutboxEventRecord[]> {
    return prisma.outboxEvent.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: batchSize,
    });
  }

  async markAsPublished(prisma: OutboxPrismaClient, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }

  async incrementRetry(prisma: OutboxPrismaClient, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: {
        retryCount: { increment: 1 },
      },
    });
  }

  async markAsFailed(prisma: OutboxPrismaClient, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: { status: 'FAILED' },
    });
  }
}
