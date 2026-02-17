import { Injectable } from '@nestjs/common';
import { OutboxStore, OutboxEvent } from '@telecom/toolkit';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CustomerOutboxStore implements OutboxStore {
  constructor(private readonly prisma: PrismaService) {}

  async findPendingEvents(batchSize: number): Promise<OutboxEvent[]> {
    const events = await this.prisma.outboxEvent.findMany({
      where: { status: 'PENDING' },
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
      data: { status: 'PUBLISHED', publishedAt: new Date() },
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
      data: { status: 'FAILED' },
    });
  }
}
