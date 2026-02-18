import { Module } from '@nestjs/common';

// Infrastructure
import { PrismaService } from './infrastructure/database/prisma.service';
import { PlanRepository } from './infrastructure/database/repositories/plan.repository';
import { OfferRepository } from './infrastructure/database/repositories/offer.repository';
import { PriceLocalityRepository } from './infrastructure/database/repositories/price-locality.repository';
import { CatalogOutboxStore } from './infrastructure/kafka/catalog-outbox.store';
import { CatalogGrpcController } from './infrastructure/grpc/catalog-grpc.controller';

// Commands
import { CreatePlanCommand } from './application/commands/create-plan.command';
import { UpdatePlanCommand } from './application/commands/update-plan.command';
import { DeprecatePlanCommand } from './application/commands/deprecate-plan.command';
import { CreateOfferCommand } from './application/commands/create-offer.command';
import { DeactivateOfferCommand } from './application/commands/deactivate-offer.command';
import { SetLocalityPriceCommand } from './application/commands/set-locality-price.command';

// Queries
import { GetPlanQuery } from './application/queries/get-plan.query';
import { ListPlansQuery } from './application/queries/list-plans.query';
import { GetOfferQuery } from './application/queries/get-offer.query';
import { ListOffersQuery } from './application/queries/list-offers.query';
import { GetOfferPriceByLocalityQuery } from './application/queries/get-offer-price-by-locality.query';
import { ListLocalityPricesQuery } from './application/queries/list-locality-prices.query';

// Controllers
import { PlanController } from './presentation/rest/plan.controller';
import { OfferController } from './presentation/rest/offer.controller';
import { PriceLocalityController } from './presentation/rest/price-locality.controller';

@Module({
  controllers: [
    PlanController,
    OfferController,
    PriceLocalityController,
    CatalogGrpcController,
  ],
  providers: [
    // Infrastructure
    PrismaService,
    PlanRepository,
    OfferRepository,
    PriceLocalityRepository,
    CatalogOutboxStore,

    // Commands
    CreatePlanCommand,
    UpdatePlanCommand,
    DeprecatePlanCommand,
    CreateOfferCommand,
    DeactivateOfferCommand,
    SetLocalityPriceCommand,

    // Queries
    GetPlanQuery,
    ListPlansQuery,
    GetOfferQuery,
    ListOffersQuery,
    GetOfferPriceByLocalityQuery,
    ListLocalityPricesQuery,
  ],
  exports: [PrismaService],
})
export class AppModule {}
