import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SubscriptionRecord = Prisma.SubscriptionGetPayload<{}>;

export type SubscriptionWithRelations = Prisma.SubscriptionGetPayload<{
  include: {
    lines: true;
    familyGroup: { include: { members: true } };
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ServiceLineRecord = Prisma.ServiceLineGetPayload<{}>;

export type FamilyGroupWithMembers = Prisma.FamilyGroupGetPayload<{
  include: { members: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FamilyMemberRecord = Prisma.FamilyMemberGetPayload<{}>;
