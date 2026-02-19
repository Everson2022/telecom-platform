import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { LocalityRepository } from '../../infrastructure/database/repositories/locality.repository';
import { LocalityRecord } from '../../domain/types';
import { LOCALITY_EVENTS } from '../../domain/events/locality-events';
import { LocalityNotFoundException } from '../../errors';

@Injectable()
export class DeactivateLocalityCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localityRepo: LocalityRepository,
  ) {}

  async execute(localityId: string): Promise<LocalityRecord> {
    const locality = await this.localityRepo.findById(localityId);
    if (!locality) {
      throw new LocalityNotFoundException(localityId);
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.locality.update({
        where: { id: localityId },
        data: { status: 'INACTIVE' },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: updated.id,
          aggregateType: 'Locality',
          eventType: LOCALITY_EVENTS.LOCALITY_DEACTIVATED,
          payload: {
            eventId: uuidv7(),
            localityId: updated.id,
            dddCode: updated.dddCode,
            city: updated.city,
          },
        },
      });

      return updated;
    });
  }
}
