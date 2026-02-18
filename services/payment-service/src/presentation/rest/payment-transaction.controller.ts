import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { PaginationQueryDto } from '../dto/list-query.dto';
import { TransactionResponseDto, TransactionListResponseDto } from '../dto/transaction-response.dto';
import { TransactionStatus, TransactionType } from '../../domain/enums';
import { ProcessPaymentCommand } from '../../application/commands/process-payment.command';
import { RefundPaymentCommand } from '../../application/commands/refund-payment.command';
import { GetTransactionQuery } from '../../application/queries/get-transaction.query';
import { ListTransactionsQuery } from '../../application/queries/list-transactions.query';

@ApiTags('Transactions')
@Controller('transactions')
export class PaymentTransactionController {
  constructor(
    private readonly processPayment: ProcessPaymentCommand,
    private readonly refundPayment: RefundPaymentCommand,
    private readonly getTransaction: GetTransactionQuery,
    private readonly listTransactions: ListTransactionsQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Processar pagamento' })
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: 'Metodo de pagamento inativo' })
  @ApiResponse({ status: 404, description: 'Metodo de pagamento nao encontrado' })
  async process(@Body() dto: ProcessPaymentDto) {
    return this.processPayment.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar transacoes' })
  @ApiResponse({ status: 200, type: TransactionListResponseDto })
  async list(
    @Query('customerId') customerId: string | undefined,
    @Query('subscriptionId') subscriptionId: string | undefined,
    @Query('status') status: TransactionStatus | undefined,
    @Query('type') type: TransactionType | undefined,
    @Query() query: PaginationQueryDto,
  ) {
    return this.listTransactions.execute({ customerId, subscriptionId, status, type, ...query });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar transacao por ID' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  @ApiResponse({ status: 404, description: 'Transacao nao encontrada' })
  async findById(@Param() params: IdParamDto) {
    return this.getTransaction.byId(params.id);
  }

  @Post(':id/refund')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Estornar pagamento' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: 'Transacao nao pode ser estornada' })
  @ApiResponse({ status: 404, description: 'Transacao nao encontrada' })
  async refund(@Param() params: IdParamDto) {
    return this.refundPayment.execute(params.id);
  }
}
