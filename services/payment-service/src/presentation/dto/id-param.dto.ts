import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamDto {
  @ApiProperty({ description: 'UUID do recurso' })
  @IsUUID()
  id!: string;
}
