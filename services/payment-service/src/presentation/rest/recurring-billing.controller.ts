import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivateRecurringBillingDto } from '../dto/activate-recurring-billing.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { RecurringBillingResponseDto } from '../dto/recurring-billing-response.dto';
import { ActivateRecurringBillingCommand } from '../../application/commands/activate-recurring-billing.command';
import { CancelRecurringBillingCommand } from '../../application/commands/cancel-recurring-billing.command';
import { ProcessRecurringBillingCommand } from '../../application/commands/process-recurring-billing.command';
import { GetRecurringBillingQuery } from '../../application/queries/get-recurring-billing.query';

@ApiTags('Recurring Billing')
@Controller('recurring-billings')
export class RecurringBillingController {
  constructor(
    private readonly activateRecurringBilling: ActivateRecurringBillingCommand,
    private readonly cancelRecurringBilling: CancelRecurringBillingCommand,
    private readonly processRecurringBilling: ProcessRecurringBillingCommand,
    private readonly getRecurringBilling: GetRecurringBillingQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Ativar cobranca recorrente' })
  @ApiResponse({ status: 201, schema: { properties: { recurringBillingId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Metodo de pagamento inativo' })
  @ApiResponse({ status: 404, description: 'Metodo de pagamento nao encontrado' })
  @ApiResponse({ status: 409, description: 'Recorrencia ja existe para a assinatura' })
  async activate(@Body() dto: ActivateRecurringBillingDto) {
    const recurringBillingId = await this.activateRecurringBilling.execute(dto);
    return { recurringBillingId };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cobranca recorrente por ID' })
  @ApiResponse({ status: 200, type: RecurringBillingResponseDto })
  @ApiResponse({ status: 404, description: 'Recorrencia nao encontrada' })
  async findById(@Param() params: IdParamDto) {
    return this.getRecurringBilling.byId(params.id);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar cobranca recorrente' })
  @ApiResponse({ status: 200, description: 'Cancelado com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrencia nao encontrada' })
  async cancel(@Param() params: IdParamDto) {
    await this.cancelRecurringBilling.execute(params.id);
    return { message: 'Recurring billing cancelled' };
  }

  @Post(':id/process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Processar cobranca recorrente (uso interno/cron)' })
  @ApiResponse({ status: 200, description: 'Processado' })
  @ApiResponse({ status: 404, description: 'Recorrencia nao encontrada' })
  async process(@Param() params: IdParamDto) {
    await this.processRecurringBilling.execute(params.id);
    return { message: 'Recurring billing processed' };
  }
}
