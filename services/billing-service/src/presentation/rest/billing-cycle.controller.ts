import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GenerateBillingCycleCommand } from '../../application/commands/generate-billing-cycle.command';
import { MarkCyclePaidCommand } from '../../application/commands/mark-cycle-paid.command';
import { MarkCycleOverdueCommand } from '../../application/commands/mark-cycle-overdue.command';
import { CancelBillingCycleCommand } from '../../application/commands/cancel-billing-cycle.command';
import { GetBillingCycleByIdQuery } from '../../application/queries/get-billing-cycle-by-id.query';
import { ListBillingCyclesBySubscriptionQuery } from '../../application/queries/list-billing-cycles-by-subscription.query';
import { GenerateBillingCycleDto } from '../dto/generate-billing-cycle.dto';
import { MarkCyclePaidDto } from '../dto/mark-cycle-paid.dto';

@ApiTags('billing-cycles')
@Controller('billing-cycles')
export class BillingCycleController {
  constructor(
    private readonly generateCycleCommand: GenerateBillingCycleCommand,
    private readonly markPaidCommand: MarkCyclePaidCommand,
    private readonly markOverdueCommand: MarkCycleOverdueCommand,
    private readonly cancelCycleCommand: CancelBillingCycleCommand,
    private readonly getByIdQuery: GetBillingCycleByIdQuery,
    private readonly listBySubscriptionQuery: ListBillingCyclesBySubscriptionQuery,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Gerar ciclo de cobrança' })
  async generate(@Body() dto: GenerateBillingCycleDto) {
    return this.generateCycleCommand.execute({
      ...dto,
      cycleStartDate: new Date(dto.cycleStartDate),
      cycleEndDate: new Date(dto.cycleEndDate),
      dueDate: new Date(dto.dueDate),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ciclo de cobrança por ID' })
  async getById(@Param('id') id: string) {
    return this.getByIdQuery.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ciclos de cobrança por assinatura' })
  async listBySubscription(@Query('subscriptionId') subscriptionId: string) {
    return this.listBySubscriptionQuery.execute(subscriptionId);
  }

  @Patch(':id/pay')
  @ApiOperation({ summary: 'Marcar ciclo como pago' })
  async markPaid(@Param('id') id: string, @Body() dto: MarkCyclePaidDto) {
    return this.markPaidCommand.execute({ billingCycleId: id, paymentTransactionId: dto.paymentTransactionId });
  }

  @Patch(':id/overdue')
  @ApiOperation({ summary: 'Marcar ciclo como vencido' })
  async markOverdue(@Param('id') id: string) {
    return this.markOverdueCommand.execute(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar ciclo de cobrança' })
  async cancel(@Param('id') id: string) {
    return this.cancelCycleCommand.execute(id);
  }
}
