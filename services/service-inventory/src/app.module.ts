import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { SubscriptionRepository } from './infrastructure/database/repositories/subscription.repository';
import { ServiceLineRepository } from './infrastructure/database/repositories/service-line.repository';
import { FamilyGroupRepository } from './infrastructure/database/repositories/family-group.repository';
import { ServiceInventoryOutboxStore } from './infrastructure/kafka/service-inventory-outbox.store';
import { CreateSubscriptionCommand } from './application/commands/create-subscription.command';
import { ActivateSubscriptionCommand } from './application/commands/activate-subscription.command';
import { SuspendSubscriptionCommand } from './application/commands/suspend-subscription.command';
import { ReactivateSubscriptionCommand } from './application/commands/reactivate-subscription.command';
import { CancelSubscriptionCommand } from './application/commands/cancel-subscription.command';
import { AddServiceLineCommand } from './application/commands/add-service-line.command';
import { ActivateServiceLineCommand } from './application/commands/activate-service-line.command';
import { InviteFamilyMemberCommand } from './application/commands/invite-family-member.command';
import { AcceptFamilyMemberCommand } from './application/commands/accept-family-member.command';
import { RemoveFamilyMemberCommand } from './application/commands/remove-family-member.command';
import { GetSubscriptionByIdQuery } from './application/queries/get-subscription-by-id.query';
import { ListSubscriptionsByCustomerQuery } from './application/queries/list-subscriptions-by-customer.query';
import { GetServiceLineByMsisdnQuery } from './application/queries/get-service-line-by-msisdn.query';
import { GetFamilyGroupQuery } from './application/queries/get-family-group.query';
import { CountActiveLinesQuery } from './application/queries/count-active-lines.query';
import { CheckParallelSubscriptionsQuery } from './application/queries/check-parallel-subscriptions.query';
import { SubscriptionController } from './presentation/rest/subscription.controller';
import { ServiceLineController } from './presentation/rest/service-line.controller';
import { FamilyGroupController } from './presentation/rest/family-group.controller';

@Module({
  imports: [],
  controllers: [SubscriptionController, ServiceLineController, FamilyGroupController],
  providers: [
    PrismaService,
    SubscriptionRepository,
    ServiceLineRepository,
    FamilyGroupRepository,
    ServiceInventoryOutboxStore,
    // Commands
    CreateSubscriptionCommand,
    ActivateSubscriptionCommand,
    SuspendSubscriptionCommand,
    ReactivateSubscriptionCommand,
    CancelSubscriptionCommand,
    AddServiceLineCommand,
    ActivateServiceLineCommand,
    InviteFamilyMemberCommand,
    AcceptFamilyMemberCommand,
    RemoveFamilyMemberCommand,
    // Queries
    GetSubscriptionByIdQuery,
    ListSubscriptionsByCustomerQuery,
    GetServiceLineByMsisdnQuery,
    GetFamilyGroupQuery,
    CountActiveLinesQuery,
    CheckParallelSubscriptionsQuery,
  ],
})
export class AppModule {}
