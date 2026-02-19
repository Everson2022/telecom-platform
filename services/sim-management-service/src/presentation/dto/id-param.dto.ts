import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdParamDto {
  @ApiProperty({ description: 'Resource UUID' })
  @IsUUID()
  id!: string;
}
