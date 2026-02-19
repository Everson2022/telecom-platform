import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';
import { LOCALITY_EVENTS } from '../../domain/events/locality-events';
import { DuplicateLocalityException } from '../../errors';

export interface CreateLocalityInput {
  dddCode: string;
  city: string;
  state: string;
  region: string;
  ibgeCode: string;
  hasCoverage?: boolean;
}

@Injectable()
export class CreateLocalityCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localityRepo: LocalityRepository,
  ) {}

  async execute(input: CreateLocalityInput): Promise<LocalityRecord> {
    const existing = await this.localityRepo.findByIbgeCode(input.ibgeCode);
    if (existing) {
      throw new DuplicateLocalityException(input.ibgeCode);
    }

    return this.prisma.$transaction(async (tx) => {
      const locality = await tx.locality.create({
        data: {
          dddCode: input.dddCode,
          city: input.city,
          state: input.state,
          region: input.region,
          ibgeCode: input.ibgeCode,
          hasCoverage: input.hasCoverage ?? false,
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: locality.id,
          aggregateType: 'Locality',
          eventType: LOCALITY_EVENTS.LOCALITY_CREATED,
          payload: {
            eventId: uuidv7(),
            localityId: locality.id,
            dddCode: locality.dddCode,
            city: locality.city,
            state: locality.state,
            ibgeCode: locality.ibgeCode,
            hasCoverage: locality.hasCoverage,
          },
        },
      });

      return locality;
    });
  }
}
