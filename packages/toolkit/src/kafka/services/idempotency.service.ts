import { Injectable, Logger } from '@nestjs/common';

export interface IdempotencyStore {
  exists(eventId: string): Promise<boolean>;
  save(eventId: string, eventType: string): Promise<void>;
}

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);

  constructor(private readonly store: IdempotencyStore) {}

  async isProcessed(eventId: string): Promise<boolean> {
    return this.store.exists(eventId);
  }

  async markAsProcessed(eventId: string, eventType: string): Promise<void> {
    await this.store.save(eventId, eventType);
    this.logger.debug(`Marked event ${eventId} (${eventType}) as processed`);
  }
}

export interface ProcessedEventPrismaClient {
  processedEvent: {
    findUnique(args: { where: { eventId: string } }): Promise<{ eventId: string } | null>;
    create(args: { data: { eventId: string; eventType: string } }): Promise<unknown>;
  };
}

export class PrismaIdempotencyStore implements IdempotencyStore {
  constructor(private readonly prisma: ProcessedEventPrismaClient) {}

  async exists(eventId: string): Promise<boolean> {
    const record = await this.prisma.processedEvent.findUnique({
      where: { eventId },
    });
    return record !== null;
  }

  async save(eventId: string, eventType: string): Promise<void> {
    await this.prisma.processedEvent.create({
      data: { eventId, eventType },
    });
  }
}
