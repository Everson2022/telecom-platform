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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanResponseDto, PlanListResponseDto } from '../dto/plan-response.dto';
import { CreatePlanCommand } from '../../application/commands/create-plan.command';
import { UpdatePlanCommand } from '../../application/commands/update-plan.command';
import { DeprecatePlanCommand } from '../../application/commands/deprecate-plan.command';
import { GetPlanQuery } from '../../application/queries/get-plan.query';
import { ListPlansQuery } from '../../application/queries/list-plans.query';
import { PlanStatus, PlanType } from '../../domain/enums';

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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'INACTIVE', 'DEPRECATED'] })
  @ApiQuery({ name: 'type', required: false, enum: ['CONTROL', 'PREPAID', 'POSTPAID'] })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, type: PlanListResponseDto })
  async list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('status') status?: PlanStatus,
    @Query('type') type?: PlanType,
    @Query('search') search?: string,
  ) {
    return this.listPlans.execute({
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      status,
      type,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar plano por ID' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.getPlan.byId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar plano' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 400, description: 'Plano nao esta ACTIVE' })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.updatePlan.execute(id, dto);
  }

  @Post(':id/deprecate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Depreciar plano' })
  @ApiResponse({ status: 200, type: PlanResponseDto })
  @ApiResponse({ status: 400, description: 'Transicao de status invalida' })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async deprecate(@Param('id', ParseUUIDPipe) id: string) {
    return this.deprecatePlan.execute(id);
  }
}
