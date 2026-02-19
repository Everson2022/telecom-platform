import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteFamilyMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  memberCustomerId!: string;
}
