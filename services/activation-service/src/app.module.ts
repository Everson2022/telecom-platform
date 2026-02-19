import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { LineActivationRepository } from './infrastructure/database/repositories/line-activation.repository';
import { MsisdnPoolRepository } from './infrastructure/database/repositories/msisdn-pool.repository';
import { FakeNetworkCoreClient } from './infrastructure/core/fake-network-core.client';
import { ActivationOutboxStore } from './infrastructure/kafka/activation-outbox.store';
import { ActivateLineCommand } from './application/commands/activate-line.command';
import { SuspendLineCommand } from './application/commands/suspend-line.command';
import { ReactivateLineCommand } from './application/commands/reactivate-line.command';
import { DeactivateLineCommand } from './application/commands/deactivate-line.command';
import { GetActivationByOrderIdQuery } from './application/queries/get-activation-by-order-id.query';
import { GetActivationByMsisdnQuery } from './application/queries/get-activation-by-msisdn.query';
import { ActivationController } from './presentation/rest/activation.controller';
import { MsisdnPoolController } from './presentation/rest/msisdn-pool.controller';

@Module({
  imports: [],
  controllers: [ActivationController, MsisdnPoolController],
  providers: [
    PrismaService,
    LineActivationRepository,
    MsisdnPoolRepository,
    FakeNetworkCoreClient,
    ActivationOutboxStore,
    ActivateLineCommand,
    SuspendLineCommand,
    ReactivateLineCommand,
    DeactivateLineCommand,
    GetActivationByOrderIdQuery,
    GetActivationByMsisdnQuery,
  ],
})
export class AppModule {}
