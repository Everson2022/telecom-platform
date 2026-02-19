import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { BillingCycleRepository } from './infrastructure/database/repositories/billing-cycle.repository';
import { ExternalBillingRepository } from './infrastructure/database/repositories/external-billing.repository';
import { BillingOutboxStore } from './infrastructure/kafka/billing-outbox.store';
import { GenerateBillingCycleCommand } from './application/commands/generate-billing-cycle.command';
import { MarkCyclePaidCommand } from './application/commands/mark-cycle-paid.command';
import { MarkCycleOverdueCommand } from './application/commands/mark-cycle-overdue.command';
import { CancelBillingCycleCommand } from './application/commands/cancel-billing-cycle.command';
import { RegisterExternalBillingCommand } from './application/commands/register-external-billing.command';
import { GetBillingCycleByIdQuery } from './application/queries/get-billing-cycle-by-id.query';
import { ListBillingCyclesBySubscriptionQuery } from './application/queries/list-billing-cycles-by-subscription.query';
import { BillingCycleController } from './presentation/rest/billing-cycle.controller';
import { ExternalBillingController } from './presentation/rest/external-billing.controller';

@Module({
  imports: [],
  controllers: [BillingCycleController, ExternalBillingController],
  providers: [
    PrismaService,
    BillingCycleRepository,
    ExternalBillingRepository,
    BillingOutboxStore,
    // Commands
    GenerateBillingCycleCommand,
    MarkCyclePaidCommand,
    MarkCycleOverdueCommand,
    CancelBillingCycleCommand,
    RegisterExternalBillingCommand,
    // Queries
    GetBillingCycleByIdQuery,
    ListBillingCyclesBySubscriptionQuery,
  ],
})
export class AppModule {}
