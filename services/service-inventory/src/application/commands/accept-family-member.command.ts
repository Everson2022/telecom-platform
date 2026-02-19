import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { FamilyGroupRepository } from '../../infrastructure/database/repositories/family-group.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { MemberStatus } from '../../domain/enums';
import { FamilyGroupNotFoundException } from '../../errors';
import { FamilyMemberRecord } from '../../domain/types';

export interface AcceptFamilyMemberInput {
  familyGroupId: string;
  memberId: string;
  lineId: string;
}

@Injectable()
export class AcceptFamilyMemberCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly familyGroupRepo: FamilyGroupRepository,
  ) {}

  async execute(input: AcceptFamilyMemberInput): Promise<FamilyMemberRecord> {
    const familyGroup = await this.familyGroupRepo.findById(input.familyGroupId);
    if (!familyGroup) {
      throw new FamilyGroupNotFoundException(input.familyGroupId);
    }

    const member = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updated = await tx.familyMember.update({
        where: { id: input.memberId },
        data: {
          status: MemberStatus.ACTIVE,
          lineId: input.lineId,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: familyGroup.id,
        aggregateType: 'FamilyGroup',
        eventType: SERVICE_INVENTORY_EVENTS.FAMILY_MEMBER_JOINED,
        payload: {
          familyGroupId: input.familyGroupId,
          memberId: input.memberId,
          memberCustomerId: updated.customerId,
          lineId: input.lineId,
          subscriptionId: familyGroup.subscriptionId,
        },
      });

      return updated;
    });

    return member;
  }
}
