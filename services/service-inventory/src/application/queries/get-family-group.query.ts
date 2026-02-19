import { Injectable } from '@nestjs/common';
import { FamilyGroupRepository } from '../../infrastructure/database/repositories/family-group.repository';
import { FamilyGroupWithMembers } from '../../domain/types';
import { FamilyGroupNotFoundException } from '../../errors';

@Injectable()
export class GetFamilyGroupQuery {
  constructor(private readonly familyGroupRepo: FamilyGroupRepository) {}

  async executeBySubscriptionId(subscriptionId: string): Promise<FamilyGroupWithMembers> {
    const group = await this.familyGroupRepo.findBySubscriptionId(subscriptionId);
    if (!group) {
      throw new FamilyGroupNotFoundException(subscriptionId);
    }
    return group;
  }

  async executeById(familyGroupId: string): Promise<FamilyGroupWithMembers> {
    const group = await this.familyGroupRepo.findById(familyGroupId);
    if (!group) {
      throw new FamilyGroupNotFoundException(familyGroupId);
    }
    return group;
  }
}
