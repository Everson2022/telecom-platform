import { Module } from '@nestjs/common';

// Infrastructure
import { PrismaService } from './infrastructure/database/prisma.service';
import { SimCardRepository } from './infrastructure/database/repositories/sim-card.repository';
import { SimImportBatchRepository } from './infrastructure/database/repositories/sim-import-batch.repository';
import { SimSwapRequestRepository } from './infrastructure/database/repositories/sim-swap-request.repository';
import { SimOutboxStore } from './infrastructure/kafka/sim-outbox.store';
import { SimGrpcController } from './infrastructure/grpc/sim-grpc.controller';

// Commands
import { ImportSimBatchCommand } from './application/commands/import-sim-batch.command';
import { AllocateSimCommand } from './application/commands/allocate-sim.command';
import { DeallocateSimCommand } from './application/commands/deallocate-sim.command';
import { ActivateSimCommand } from './application/commands/activate-sim.command';
import { DeactivateSimCommand } from './application/commands/deactivate-sim.command';
import { RequestSimSwapCommand } from './application/commands/request-sim-swap.command';
import { CompleteSimSwapCommand } from './application/commands/complete-sim-swap.command';

// Queries
import { GetSimByIdQuery } from './application/queries/get-sim-by-id.query';
import { GetSimByIccidQuery } from './application/queries/get-sim-by-iccid.query';
import { ListAvailableSimsQuery } from './application/queries/list-available-sims.query';
import { GetSimImportBatchQuery } from './application/queries/get-sim-import-batch.query';
import { GetSimSwapRequestQuery } from './application/queries/get-sim-swap-request.query';

// REST Controllers
import { SimCardController } from './presentation/rest/sim-card.controller';
import { SimImportBatchController } from './presentation/rest/sim-import-batch.controller';
import { SimSwapController } from './presentation/rest/sim-swap.controller';

@Module({
  controllers: [
    SimCardController,
    SimImportBatchController,
    SimSwapController,
    SimGrpcController,
  ],
  providers: [
    // Infrastructure
    PrismaService,
    SimCardRepository,
    SimImportBatchRepository,
    SimSwapRequestRepository,
    SimOutboxStore,

    // Commands
    ImportSimBatchCommand,
    AllocateSimCommand,
    DeallocateSimCommand,
    ActivateSimCommand,
    DeactivateSimCommand,
    RequestSimSwapCommand,
    CompleteSimSwapCommand,

    // Queries
    GetSimByIdQuery,
    GetSimByIccidQuery,
    ListAvailableSimsQuery,
    GetSimImportBatchQuery,
    GetSimSwapRequestQuery,
  ],
  exports: [PrismaService],
})
export class AppModule {}
