import { IsUUID } from 'class-validator';

export class GetPlanByIdDto {
  @IsUUID()
  planId!: string;
}
