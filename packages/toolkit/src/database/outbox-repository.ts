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

export class OutboxRepository {
  async create(tx: PrismaTransaction, params: CreateOutboxEventParams): Promise<string> {
    const id = uuidv4();
    await (tx as any).outboxEvent.create({
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

  async findPending(prisma: any, batchSize: number) {
    return prisma.outboxEvent.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: batchSize,
    });
  }

  async markAsPublished(prisma: any, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }

  async incrementRetry(prisma: any, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: {
        retryCount: { increment: 1 },
      },
    });
  }

  async markAsFailed(prisma: any, id: string): Promise<void> {
    await prisma.outboxEvent.update({
      where: { id },
      data: { status: 'FAILED' },
    });
  }
}
