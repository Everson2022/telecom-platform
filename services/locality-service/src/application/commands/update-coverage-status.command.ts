import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';
import { LOCALITY_EVENTS } from '../../domain/events/locality-events';
import { LocalityNotFoundException } from '../../errors';

export interface UpdateCoverageStatusInput {
  localityId: string;
  hasCoverage: boolean;
}

@Injectable()
export class UpdateCoverageStatusCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localityRepo: LocalityRepository,
  ) {}

  async execute(input: UpdateCoverageStatusInput): Promise<LocalityRecord> {
    const locality = await this.localityRepo.findById(input.localityId);
    if (!locality) {
      throw new LocalityNotFoundException(input.localityId);
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.locality.update({
        where: { id: input.localityId },
        data: { hasCoverage: input.hasCoverage },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: updated.id,
          aggregateType: 'Locality',
          eventType: LOCALITY_EVENTS.COVERAGE_UPDATED,
          payload: {
            eventId: uuidv7(),
            localityId: updated.id,
            dddCode: updated.dddCode,
            city: updated.city,
            hasCoverage: updated.hasCoverage,
          },
        },
      });

      return updated;
    });
  }
}
