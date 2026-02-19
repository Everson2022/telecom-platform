import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { FamilyGroupWithMembers, FamilyMemberRecord } from '../../../domain/types';

@Injectable()
export class FamilyGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.FamilyGroupCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<FamilyGroupWithMembers> {
    const client = tx ?? this.prisma;
    return client.familyGroup.create({
      data,
      include: { members: true },
    });
  }

  async findById(id: string): Promise<FamilyGroupWithMembers | null> {
    return this.prisma.familyGroup.findUnique({
      where: { id },
      include: { members: true },
    });
  }

  async findBySubscriptionId(subscriptionId: string): Promise<FamilyGroupWithMembers | null> {
    return this.prisma.familyGroup.findUnique({
      where: { subscriptionId },
      include: { members: true },
    });
  }

  async countActiveMembers(familyGroupId: string): Promise<number> {
    return this.prisma.familyMember.count({
      where: { familyGroupId, status: { not: 'REMOVED' } },
    });
  }

  async createMember(
    data: Prisma.FamilyMemberCreateInput,
    tx?: PrismaTransactionClient,
  ): Promise<FamilyMemberRecord> {
    const client = tx ?? this.prisma;
    return client.familyMember.create({ data });
  }

  async updateMember(
    id: string,
    data: Prisma.FamilyMemberUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<FamilyMemberRecord> {
    const client = tx ?? this.prisma;
    return client.familyMember.update({ where: { id }, data });
  }

  async findMemberById(id: string, tx?: PrismaTransactionClient): Promise<FamilyMemberRecord | null> {
    const client = tx ?? this.prisma;
    return client.familyMember.findUnique({ where: { id } });
  }
}
