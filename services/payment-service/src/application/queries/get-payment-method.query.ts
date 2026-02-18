import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { PaymentMethodNotFoundException } from '../../errors/payment-method-not-found.exception';
import { PaymentMethodWithRelations } from '../../domain/types';

@Injectable()
export class GetPaymentMethodQuery {
  constructor(private readonly paymentMethodRepo: PaymentMethodRepository) {}

  async byId(id: string): Promise<PaymentMethodWithRelations> {
    const method = await this.paymentMethodRepo.findWithRelations(id);
    if (!method) {
      throw new PaymentMethodNotFoundException(id);
    }
    return method;
  }
}
