import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InviteFamilyMemberCommand } from '../../src/application/commands/invite-family-member.command';
import { MemberStatus } from '../../src/domain/enums';
import { FamilyGroupNotFoundException, FamilyCapacityExceededException } from '../../src/errors';

describe('InviteFamilyMemberCommand', () => {
  let command: InviteFamilyMemberCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockFamilyGroupRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const familyGroup = {
    id: '00000000-0000-0000-0000-000000000030',
    subscriptionId: '00000000-0000-0000-0000-000000000010',
    titularCustomerId: '00000000-0000-0000-0000-000000000001',
    maxMembers: 5,
    members: [
      {
        id: '00000000-0000-0000-0000-000000000040',
        familyGroupId: '00000000-0000-0000-0000-000000000030',
        customerId: '00000000-0000-0000-0000-000000000001',
        lineId: '00000000-0000-0000-0000-000000000020',
        role: 'TITULAR',
        status: MemberStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newMember = {
    id: '00000000-0000-0000-0000-000000000050',
    familyGroupId: familyGroup.id,
    customerId: '00000000-0000-0000-0000-000000000099',
    lineId: null,
    role: 'MEMBER',
    status: MemberStatus.INVITED,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          familyMember: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'familyMember.create', args });
              return newMember;
            }),
          },
          outboxEvent: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'outboxEvent.create', args });
              return args.data;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockFamilyGroupRepo = {
      findById: vi.fn().mockResolvedValue(familyGroup),
      countActiveMembers: vi.fn().mockResolvedValue(1),
    };

    command = new InviteFamilyMemberCommand(mockPrisma, mockFamilyGroupRepo);
  });

  it('deve convidar membro com status INVITED', async () => {
    const result = await command.execute({
      familyGroupId: familyGroup.id,
      memberCustomerId: newMember.customerId,
    });

    expect(result.status).toBe(MemberStatus.INVITED);

    const memberCreate = txOperations.find((op) => op.type === 'familyMember.create');
    expect(memberCreate.args.data.customerId).toBe(newMember.customerId);
    expect(memberCreate.args.data.status).toBe(MemberStatus.INVITED);
  });

  it('deve emitir evento family-member.invited no outbox', async () => {
    await command.execute({
      familyGroupId: familyGroup.id,
      memberCustomerId: newMember.customerId,
    });

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const invitedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.family-member.invited',
    );
    expect(invitedEvent).toBeDefined();
    expect(invitedEvent.args.data.payload.memberCustomerId).toBe(newMember.customerId);
  });

  it('deve lancar FamilyGroupNotFoundException se grupo nao existir', async () => {
    mockFamilyGroupRepo.findById.mockResolvedValue(null);

    await expect(
      command.execute({ familyGroupId: 'invalid-id', memberCustomerId: newMember.customerId }),
    ).rejects.toThrow(FamilyGroupNotFoundException);
  });

  it('deve lancar FamilyCapacityExceededException quando grupo esta cheio', async () => {
    mockFamilyGroupRepo.countActiveMembers.mockResolvedValue(5);

    await expect(
      command.execute({ familyGroupId: familyGroup.id, memberCustomerId: newMember.customerId }),
    ).rejects.toThrow(FamilyCapacityExceededException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
