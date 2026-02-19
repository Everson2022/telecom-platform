import { Injectable } from '@nestjs/common';
import { OutboxStore } from '@telecom/toolkit/kafka';
import { OutboxStatus } from '@telecom/toolkit/database';
import { PrismaService } from '../database/prisma.service';

interface OutboxEvent {
  id: string;
  aggregateId: string;
  aggregateType: string;
  eventType: string;
  payload: Record<string, unknown>;
  correlationId: string | null;
  causationId: string | null;
  status: string;
  retryCount: number;
  createdAt: Date;
  publishedAt: Date | null;
}

@Injectable()
export class SimOutboxStore implements OutboxStore {
  constructor(private readonly prisma: PrismaService) {}

  async findPendingEvents(batchSize: number): Promise<OutboxEvent[]> {
    const events = await this.prisma.outboxEvent.findMany({
      where: { status: OutboxStatus.PENDING },
      orderBy: { createdAt: 'asc' },
      take: batchSize,
    });

    return events.map((e) => ({
      id: e.id,
      aggregateId: e.aggregateId,
      aggregateType: e.aggregateType,
      eventType: e.eventType,
      payload: e.payload as Record<string, unknown>,
      correlationId: e.correlationId,
      causationId: e.causationId,
      status: e.status,
      retryCount: e.retryCount,
      createdAt: e.createdAt,
      publishedAt: e.publishedAt,
    }));
  }

  async markAsPublished(id: string): Promise<void> {
    await this.prisma.outboxEvent.update({
      where: { id },
      data: { status: OutboxStatus.PUBLISHED, publishedAt: new Date() },
    });
  }

  async incrementRetry(id: string): Promise<void> {
    await this.prisma.outboxEvent.update({
      where: { id },
      data: { retryCount: { increment: 1 } },
    });
  }

  async markAsFailed(id: string): Promise<void> {
    await this.prisma.outboxEvent.update({
      where: { id },
      data: { status: OutboxStatus.FAILED },
    });
  }
}
