import { Injectable } from '@nestjs/common';
import { PaymentTransactionRepository } from '../../infrastructure/database/repositories/payment-transaction.repository';
import { TransactionNotFoundException } from '../../errors/transaction-not-found.exception';
import { PaymentTransactionRecord } from '../../domain/types';

@Injectable()
export class GetTransactionQuery {
  constructor(private readonly transactionRepo: PaymentTransactionRepository) {}

  async byId(id: string): Promise<PaymentTransactionRecord> {
    const transaction = await this.transactionRepo.findById(id);
    if (!transaction) {
      throw new TransactionNotFoundException(id);
    }
    return transaction;
  }
}
