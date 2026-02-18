import { Logger } from '@nestjs/common';

/**
 * Minimal transaction interface required by the toolkit's OutboxRepository.
 * Services use their own Prisma.TransactionClient which satisfies this
 * interface through TypeScript's structural (bivariant method) typing.
 */
export interface PrismaTransaction {
  outboxEvent: {
    create(args: { data: Record<string, unknown> }): Promise<unknown>;
  };
}

export type PrismaClient = {
  $transaction<T>(fn: (tx: PrismaTransaction) => Promise<T>): Promise<T>;
};

export interface UnitOfWork {
  execute<T>(work: (tx: PrismaTransaction) => Promise<T>): Promise<T>;
}

export class PrismaUnitOfWork implements UnitOfWork {
  private readonly logger = new Logger(PrismaUnitOfWork.name);

  constructor(private readonly prisma: PrismaClient) {}

  async execute<T>(work: (tx: PrismaTransaction) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      this.logger.debug('Transaction started');
      try {
        const result = await work(tx);
        this.logger.debug('Transaction committed');
        return result;
      } catch (error) {
        this.logger.error('Transaction rolled back', error);
        throw error;
      }
    });
  }
}
