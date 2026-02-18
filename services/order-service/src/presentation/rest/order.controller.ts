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
import { CreateOrderDto } from '../dto/create-order.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { ListOrdersQueryDto } from '../dto/list-orders-query.dto';
import { OrderResponseDto, OrderListResponseDto } from '../dto/order-response.dto';
import { CreateOrderCommand } from '../../application/commands/create-order.command';
import { CancelOrderCommand } from '../../application/commands/cancel-order.command';
import { ProcessOrderCommand } from '../../application/commands/process-order.command';
import { GetOrderQuery } from '../../application/queries/get-order.query';
import { ListOrdersQuery } from '../../application/queries/list-orders.query';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrder: CreateOrderCommand,
    private readonly cancelOrder: CancelOrderCommand,
    private readonly processOrder: ProcessOrderCommand,
    private readonly getOrder: GetOrderQuery,
    private readonly listOrders: ListOrdersQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado', schema: { properties: { orderId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  async create(@Body() dto: CreateOrderDto) {
    const orderId = await this.createOrder.execute(dto);
    return { orderId };
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos (paginado)' })
  @ApiResponse({ status: 200, type: OrderListResponseDto })
  async list(@Query() query: ListOrdersQueryDto) {
    return this.listOrders.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Pedido nao encontrado' })
  async findById(@Param() params: IdParamDto) {
    return this.getOrder.byId(params.id);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado' })
  @ApiResponse({ status: 400, description: 'Pedido nao pode ser cancelado' })
  @ApiResponse({ status: 404, description: 'Pedido nao encontrado' })
  async cancel(@Param() params: IdParamDto) {
    await this.cancelOrder.execute(params.id);
    return { message: 'Order cancelled successfully' };
  }

  @Post(':id/process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar processamento do pedido' })
  @ApiResponse({ status: 200, description: 'Processamento iniciado' })
  @ApiResponse({ status: 400, description: 'Pedido nao pode ser processado' })
  @ApiResponse({ status: 404, description: 'Pedido nao encontrado' })
  async process(@Param() params: IdParamDto) {
    await this.processOrder.execute(params.id);
    return { message: 'Order processing started' };
  }
}
