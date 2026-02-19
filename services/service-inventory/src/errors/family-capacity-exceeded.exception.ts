import { ConflictException } from '@nestjs/common';

export class FamilyCapacityExceededException extends ConflictException {
  constructor(familyGroupId: string, maxMembers: number) {
    super(`Family group ${familyGroupId} has reached maximum capacity of ${maxMembers} members`);
  }
}
