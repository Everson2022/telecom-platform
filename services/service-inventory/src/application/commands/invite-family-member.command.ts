import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { FamilyGroupRepository } from '../../infrastructure/database/repositories/family-group.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { LineRole, MemberStatus } from '../../domain/enums';
import { FamilyGroupNotFoundException, FamilyCapacityExceededException } from '../../errors';
import { FamilyMemberRecord } from '../../domain/types';

export interface InviteFamilyMemberInput {
  familyGroupId: string;
  memberCustomerId: string;
}

@Injectable()
export class InviteFamilyMemberCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly familyGroupRepo: FamilyGroupRepository,
  ) {}

  async execute(input: InviteFamilyMemberInput): Promise<FamilyMemberRecord> {
    const familyGroup = await this.familyGroupRepo.findById(input.familyGroupId);
    if (!familyGroup) {
      throw new FamilyGroupNotFoundException(input.familyGroupId);
    }

    const activeMemberCount = await this.familyGroupRepo.countActiveMembers(input.familyGroupId);
    if (activeMemberCount >= familyGroup.maxMembers) {
      throw new FamilyCapacityExceededException(input.familyGroupId, familyGroup.maxMembers);
    }

    const member = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const created = await tx.familyMember.create({
        data: {
          familyGroupId: input.familyGroupId,
          customerId: input.memberCustomerId,
          role: LineRole.MEMBER,
          status: MemberStatus.INVITED,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: familyGroup.id,
        aggregateType: 'FamilyGroup',
        eventType: SERVICE_INVENTORY_EVENTS.FAMILY_MEMBER_INVITED,
        payload: {
          familyGroupId: input.familyGroupId,
          memberId: created.id,
          memberCustomerId: input.memberCustomerId,
          subscriptionId: familyGroup.subscriptionId,
          titularCustomerId: familyGroup.titularCustomerId,
        },
      });

      return created;
    });

    return member;
  }
}
