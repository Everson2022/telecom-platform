import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InviteFamilyMemberCommand } from '../../application/commands/invite-family-member.command';
import { RemoveFamilyMemberCommand } from '../../application/commands/remove-family-member.command';
import { GetFamilyGroupQuery } from '../../application/queries/get-family-group.query';
import { InviteFamilyMemberDto } from '../dto/invite-family-member.dto';

@ApiTags('family-groups')
@Controller('family-groups')
export class FamilyGroupController {
  constructor(
    private readonly inviteMemberCommand: InviteFamilyMemberCommand,
    private readonly removeMemberCommand: RemoveFamilyMemberCommand,
    private readonly getFamilyGroupQuery: GetFamilyGroupQuery,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar grupo familiar por ID' })
  async getById(@Param('id') id: string) {
    return this.getFamilyGroupQuery.executeById(id);
  }

  @Get('by-subscription/:subscriptionId')
  @ApiOperation({ summary: 'Buscar grupo familiar pela assinatura' })
  async getBySubscription(@Param('subscriptionId') subscriptionId: string) {
    return this.getFamilyGroupQuery.executeBySubscriptionId(subscriptionId);
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Convidar membro para o grupo familiar' })
  async inviteMember(@Param('id') familyGroupId: string, @Body() dto: InviteFamilyMemberDto) {
    return this.inviteMemberCommand.execute({
      familyGroupId,
      memberCustomerId: dto.memberCustomerId,
    });
  }

  @Delete(':id/members/:memberId')
  @ApiOperation({ summary: 'Remover membro do grupo familiar' })
  async removeMember(
    @Param('id') familyGroupId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.removeMemberCommand.execute({ familyGroupId, memberId });
  }
}
