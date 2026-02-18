import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, OrderType } from '../../domain/enums';

export class ListOrdersQueryDto {
  @ApiProperty({ required: false, description: 'Pagina (padrao: 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, description: 'Itens por pagina (padrao: 20, max: 100)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number;

  @ApiProperty({ required: false, description: 'Filtrar por cliente' })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({ enum: OrderStatus, required: false, description: 'Filtrar por status' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ enum: OrderType, required: false, description: 'Filtrar por tipo' })
  @IsOptional()
  @IsEnum(OrderType)
  type?: OrderType;
}
