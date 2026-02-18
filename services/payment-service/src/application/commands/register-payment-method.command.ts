import { Injectable, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { PaymentMethodRepository } from '../../infrastructure/database/repositories/payment-method.repository';
import { PAYMENT_EVENTS } from '../../domain/events/payment-events';
import { PaymentMethodType, PaymentMethodStatus } from '../../domain/enums';
import { RegisterPaymentMethodDto } from '../../presentation/dto/register-payment-method.dto';

@Injectable()
export class RegisterPaymentMethodCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentMethodRepo: PaymentMethodRepository,
  ) {}

  async execute(dto: RegisterPaymentMethodDto): Promise<string> {
    const existing = await this.paymentMethodRepo.findBySubscription(dto.subscriptionId);
    if (existing) {
      throw new ConflictException(
        `An active payment method already exists for subscription ${dto.subscriptionId}`,
      );
    }

    const paymentMethodId = uuidv4();

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.paymentMethod.create({
        data: {
          id: paymentMethodId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          type: dto.type,
          status: PaymentMethodStatus.ACTIVE,
          // Card fields
          cardLastFour: dto.type === PaymentMethodType.CARD ? dto.card?.lastFour : null,
          cardBrand: dto.type === PaymentMethodType.CARD ? dto.card?.brand : null,
          cardHolderName: dto.type === PaymentMethodType.CARD ? dto.card?.holderName : null,
          cardExpMonth: dto.type === PaymentMethodType.CARD ? dto.card?.expMonth : null,
          cardExpYear: dto.type === PaymentMethodType.CARD ? dto.card?.expYear : null,
          cardTokenizedId: dto.type === PaymentMethodType.CARD ? dto.card?.tokenizedId : null,
          // PIX fields
          pixKeyType: dto.type === PaymentMethodType.PIX ? dto.pix?.keyType : null,
          pixKey: dto.type === PaymentMethodType.PIX ? dto.pix?.key : null,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: paymentMethodId,
        aggregateType: 'PaymentMethod',
        eventType: PAYMENT_EVENTS.METHOD_REGISTERED,
        payload: {
          paymentMethodId,
          customerId: dto.customerId,
          subscriptionId: dto.subscriptionId,
          type: dto.type,
        },
      });
    });

    return paymentMethodId;
  }
}
