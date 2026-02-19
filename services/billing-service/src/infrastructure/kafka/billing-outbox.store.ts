import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BillingOutboxStore {
  private readonly outboxRepo = new OutboxRepository();

  constructor(private readonly prisma: PrismaService) {}

  getRepo(): OutboxRepository {
    return this.outboxRepo;
  }

  getPrisma(): PrismaService {
    return this.prisma;
  }
}
