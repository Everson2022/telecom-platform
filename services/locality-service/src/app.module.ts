import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { LocalityRepository } from './infrastructure/database/repositories/locality.repository';
import { LocalityOutboxStore } from './infrastructure/kafka/locality-outbox.store';
import { CreateLocalityCommand } from './application/commands/create-locality.command';
import { UpdateCoverageStatusCommand } from './application/commands/update-coverage-status.command';
import { DeactivateLocalityCommand } from './application/commands/deactivate-locality.command';
import { GetLocalityByDddQuery } from './application/queries/get-locality-by-ddd.query';
import { GetLocalityByCityQuery } from './application/queries/get-locality-by-city.query';
import { ListLocalitiesByStateQuery } from './application/queries/list-localities-by-state.query';
import { CheckCoverageQuery } from './application/queries/check-coverage.query';
import { LocalityController } from './presentation/rest/locality.controller';

@Module({
  imports: [],
  controllers: [LocalityController],
  providers: [
    PrismaService,
    LocalityRepository,
    LocalityOutboxStore,
    // Commands
    CreateLocalityCommand,
    UpdateCoverageStatusCommand,
    DeactivateLocalityCommand,
    // Queries
    GetLocalityByDddQuery,
    GetLocalityByCityQuery,
    ListLocalitiesByStateQuery,
    CheckCoverageQuery,
  ],
})
export class AppModule {}
