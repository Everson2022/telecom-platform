import { Module } from '@nestjs/common';

// Infrastructure
import { PrismaService } from './infrastructure/database/prisma.service';
import { PaymentMethodRepository } from './infrastructure/database/repositories/payment-method.repository';
import { PaymentTransactionRepository } from './infrastructure/database/repositories/payment-transaction.repository';
import { RecurringBillingRepository } from './infrastructure/database/repositories/recurring-billing.repository';
import { PaymentOutboxStore } from './infrastructure/kafka/payment-outbox.store';

// Commands
import { RegisterPaymentMethodCommand } from './application/commands/register-payment-method.command';
import { RemovePaymentMethodCommand } from './application/commands/remove-payment-method.command';
import { ProcessPaymentCommand } from './application/commands/process-payment.command';
import { RefundPaymentCommand } from './application/commands/refund-payment.command';
import { ActivateRecurringBillingCommand } from './application/commands/activate-recurring-billing.command';
import { CancelRecurringBillingCommand } from './application/commands/cancel-recurring-billing.command';
import { ProcessRecurringBillingCommand } from './application/commands/process-recurring-billing.command';

// Queries
import { GetPaymentMethodQuery } from './application/queries/get-payment-method.query';
import { ListPaymentMethodsQuery } from './application/queries/list-payment-methods.query';
import { GetTransactionQuery } from './application/queries/get-transaction.query';
import { ListTransactionsQuery } from './application/queries/list-transactions.query';
import { GetRecurringBillingQuery } from './application/queries/get-recurring-billing.query';

// Controllers
import { PaymentMethodController } from './presentation/rest/payment-method.controller';
import { PaymentTransactionController } from './presentation/rest/payment-transaction.controller';
import { RecurringBillingController } from './presentation/rest/recurring-billing.controller';

@Module({
  controllers: [
    PaymentMethodController,
    PaymentTransactionController,
    RecurringBillingController,
  ],
  providers: [
    // Infrastructure
    PrismaService,
    PaymentMethodRepository,
    PaymentTransactionRepository,
    RecurringBillingRepository,
    PaymentOutboxStore,

    // Commands
    RegisterPaymentMethodCommand,
    RemovePaymentMethodCommand,
    ProcessPaymentCommand,
    RefundPaymentCommand,
    ActivateRecurringBillingCommand,
    CancelRecurringBillingCommand,
    ProcessRecurringBillingCommand,

    // Queries
    GetPaymentMethodQuery,
    ListPaymentMethodsQuery,
    GetTransactionQuery,
    ListTransactionsQuery,
    GetRecurringBillingQuery,
  ],
  exports: [PrismaService],
})
export class AppModule {}
