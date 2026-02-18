import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransactionClient = Prisma.TransactionClient;

// Default transaction options applied globally to all $transaction() calls.
// Override per-call when needed:
//   await this.prisma.$transaction(fn, { timeout: 30_000 })
const DEFAULT_TRANSACTION_OPTIONS = {
  timeout: 15_000, // ms — max duration of a transaction before abort
  maxWait: 5_000,  // ms — max time to wait for a connection from the pool
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({ transactionOptions: DEFAULT_TRANSACTION_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
