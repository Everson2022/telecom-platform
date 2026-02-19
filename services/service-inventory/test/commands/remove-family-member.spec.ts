import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RemoveFamilyMemberCommand } from '../../src/application/commands/remove-family-member.command';
import { MemberStatus } from '../../src/domain/enums';
import { FamilyGroupNotFoundException } from '../../src/errors';

describe('RemoveFamilyMemberCommand', () => {
  let command: RemoveFamilyMemberCommand;
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
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const activeMember = {
    id: '00000000-0000-0000-0000-000000000050',
    familyGroupId: familyGroup.id,
    customerId: '00000000-0000-0000-0000-000000000099',
    lineId: '00000000-0000-0000-0000-000000000020',
    role: 'MEMBER',
    status: MemberStatus.ACTIVE,
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
            update: vi.fn(async (args: any) => {
              txOperations.push({ type: 'familyMember.update', args });
              return { ...activeMember, ...args.data };
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
    };

    command = new RemoveFamilyMemberCommand(mockPrisma, mockFamilyGroupRepo);
  });

  it('deve marcar membro como REMOVED', async () => {
    const result = await command.execute({
      familyGroupId: familyGroup.id,
      memberId: activeMember.id,
    });

    expect(result.status).toBe(MemberStatus.REMOVED);

    const memberUpdate = txOperations.find((op) => op.type === 'familyMember.update');
    expect(memberUpdate.args.data.status).toBe(MemberStatus.REMOVED);
  });

  it('deve emitir evento family-member.removed no outbox', async () => {
    await command.execute({ familyGroupId: familyGroup.id, memberId: activeMember.id });

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(1);

    const removedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.family-member.removed',
    );
    expect(removedEvent).toBeDefined();
    expect(removedEvent.args.data.payload.memberId).toBe(activeMember.id);
  });

  it('deve lancar FamilyGroupNotFoundException se grupo nao existir', async () => {
    mockFamilyGroupRepo.findById.mockResolvedValue(null);

    await expect(
      command.execute({ familyGroupId: 'invalid-id', memberId: activeMember.id }),
    ).rejects.toThrow(FamilyGroupNotFoundException);
  });
});
