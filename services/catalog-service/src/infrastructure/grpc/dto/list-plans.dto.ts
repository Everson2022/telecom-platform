import { IsOptional, IsEnum } from 'class-validator';
import { PlanStatus } from '../../../domain/enums';

export class ListPlansDto {
  @IsOptional()
  @IsEnum(PlanStatus)
  status?: PlanStatus;
}
