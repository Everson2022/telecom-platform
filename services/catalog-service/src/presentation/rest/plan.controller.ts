import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { ListPlansQueryDto } from '../dto/list-plans-query.dto';
import { PlanResponseDto, PlanListResponseDto } from '../dto/plan-response.dto';
import { CreatePlanCommand } from '../../application/commands/create-plan.command';
import { UpdatePlanCommand } from '../../application/commands/update-plan.command';
import { DeprecatePlanCommand } from '../../application/commands/deprecate-plan.command';
import { GetPlanQuery } from '../../application/queries/get-plan.query';
import { ListPlansQuery } from '../../application/queries/list-plans.query';

@ApiTags('Plans')
@Controller('plans')
export class PlanController {
  constructor(
    private readonly createPlan: CreatePlanCommand,
    private readonly updatePlan: UpdatePlanCommand,
    private readonly deprecatePlan: DeprecatePlanCommand,
    private readonly getPlan: GetPlanQuery,
    private readonly listPlans: ListPlansQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo plano' })
  @ApiResponse({ status: 201, description: 'Plano criado', schema: { properties: { planId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  @ApiResponse({ status: 409, description: 'Nome do plano ja existe' })
  async create(@Body() dto: CreatePlanDto) {
    const planId = await this.createPlan.execute(dto);
    return { planId };
  }

  @Get()
  @ApiOperation({ summary: 'Listar planos (paginado)' })
  @ApiResponse({ status: 200, type: PlanListResponseDto })
  async list(@Query() query: ListPlansQueryDto) {
    return this.listPlans.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar plano por ID' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async findById(@Param() params: IdParamDto) {
    return this.getPlan.byId(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar plano' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 400, description: 'Plano nao esta ACTIVE' })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async update(@Param() params: IdParamDto, @Body() dto: UpdatePlanDto) {
    return this.updatePlan.execute(params.id, dto);
  }

  @Post(':id/deprecate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Depreciar plano' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 400, description: 'Transicao de status invalida' })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async deprecate(@Param() params: IdParamDto) {
    return this.deprecatePlan.execute(params.id);
  }
}
