import { Logger } from '@nestjs/common';

export type PrismaTransaction = {
  $executeRaw: (...args: any[]) => Promise<number>;
  $queryRaw: (...args: any[]) => Promise<any>;
  [key: string]: any;
};

export type PrismaClient = PrismaTransaction & {
  $transaction: <T>(fn: (tx: PrismaTransaction) => Promise<T>) => Promise<T>;
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
