import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LocalityOutboxStore {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingEvents(): Promise<unknown[]> {
    return this.prisma.outboxEvent.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });
  }

  async markAsPublished(id: string): Promise<void> {
    await this.prisma.outboxEvent.update({
      where: { id },
      data: { publishedAt: new Date(), status: 'PUBLISHED' },
    });
  }
}
