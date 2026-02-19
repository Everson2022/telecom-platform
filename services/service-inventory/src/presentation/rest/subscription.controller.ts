import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateSubscriptionCommand } from '../../application/commands/create-subscription.command';
import { ActivateSubscriptionCommand } from '../../application/commands/activate-subscription.command';
import { SuspendSubscriptionCommand } from '../../application/commands/suspend-subscription.command';
import { ReactivateSubscriptionCommand } from '../../application/commands/reactivate-subscription.command';
import { CancelSubscriptionCommand } from '../../application/commands/cancel-subscription.command';
import { AddServiceLineCommand } from '../../application/commands/add-service-line.command';
import { ActivateServiceLineCommand } from '../../application/commands/activate-service-line.command';
import { GetSubscriptionByIdQuery } from '../../application/queries/get-subscription-by-id.query';
import { ListSubscriptionsByCustomerQuery } from '../../application/queries/list-subscriptions-by-customer.query';
import { CountActiveLinesQuery } from '../../application/queries/count-active-lines.query';
import { CheckParallelSubscriptionsQuery } from '../../application/queries/check-parallel-subscriptions.query';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { AddServiceLineDto } from '../dto/add-service-line.dto';
import { PlanType } from '../../domain/enums';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly createSubscriptionCommand: CreateSubscriptionCommand,
    private readonly activateSubscriptionCommand: ActivateSubscriptionCommand,
    private readonly suspendSubscriptionCommand: SuspendSubscriptionCommand,
    private readonly reactivateSubscriptionCommand: ReactivateSubscriptionCommand,
    private readonly cancelSubscriptionCommand: CancelSubscriptionCommand,
    private readonly addServiceLineCommand: AddServiceLineCommand,
    private readonly activateServiceLineCommand: ActivateServiceLineCommand,
    private readonly getSubscriptionByIdQuery: GetSubscriptionByIdQuery,
    private readonly listByCustomerQuery: ListSubscriptionsByCustomerQuery,
    private readonly countActiveLinesQuery: CountActiveLinesQuery,
    private readonly checkParallelQuery: CheckParallelSubscriptionsQuery,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova assinatura' })
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.createSubscriptionCommand.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar assinatura por ID' })
  async getById(@Param('id') id: string) {
    return this.getSubscriptionByIdQuery.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar assinaturas do cliente' })
  async listByCustomer(@Query('customerId') customerId: string) {
    return this.listByCustomerQuery.execute(customerId);
  }

  @Get('parallel-check')
  @ApiOperation({ summary: 'Verificar assinaturas paralelas por tipo de plano' })
  async checkParallel(
    @Query('customerId') customerId: string,
    @Query('planType') planType: PlanType,
  ) {
    return this.checkParallelQuery.execute(customerId, planType);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Ativar assinatura' })
  async activate(@Param('id') id: string) {
    return this.activateSubscriptionCommand.execute(id);
  }

  @Patch(':id/suspend')
  @ApiOperation({ summary: 'Suspender assinatura' })
  async suspend(@Param('id') id: string) {
    return this.suspendSubscriptionCommand.execute(id);
  }

  @Patch(':id/reactivate')
  @ApiOperation({ summary: 'Reativar assinatura' })
  async reactivate(@Param('id') id: string) {
    return this.reactivateSubscriptionCommand.execute(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar assinatura' })
  async cancel(@Param('id') id: string) {
    return this.cancelSubscriptionCommand.execute(id);
  }

  @Post(':id/lines')
  @ApiOperation({ summary: 'Adicionar linha de servico' })
  async addLine(@Param('id') subscriptionId: string, @Body() dto: AddServiceLineDto) {
    return this.addServiceLineCommand.execute({ ...dto, subscriptionId });
  }

  @Patch(':id/lines/activate-by-msisdn')
  @ApiOperation({ summary: 'Ativar linha por MSISDN' })
  async activateLine(@Query('msisdn') msisdn: string) {
    return this.activateServiceLineCommand.execute(msisdn);
  }

  @Get(':id/lines/count')
  @ApiOperation({ summary: 'Contar linhas ativas da assinatura' })
  async countLines(@Param('id') subscriptionId: string) {
    return this.countActiveLinesQuery.execute(subscriptionId);
  }
}
