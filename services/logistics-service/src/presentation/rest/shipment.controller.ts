import { Controller, Get, Post, Patch, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateShipmentCommand } from '../../application/commands/create-shipment.command';
import { UpdateShipmentStatusCommand } from '../../application/commands/update-shipment-status.command';
import { GetShipmentByIdQuery } from '../../application/queries/get-shipment-by-id.query';
import { GetShipmentByOrderIdQuery } from '../../application/queries/get-shipment-by-order-id.query';
import { ListShipmentsByCustomerQuery } from '../../application/queries/list-shipments-by-customer.query';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';
import { ShipmentResponseDto } from '../dto/shipment-response.dto';

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentController {
  constructor(
    private readonly createShipmentCommand: CreateShipmentCommand,
    private readonly updateShipmentStatusCommand: UpdateShipmentStatusCommand,
    private readonly getByIdQuery: GetShipmentByIdQuery,
    private readonly getByOrderIdQuery: GetShipmentByOrderIdQuery,
    private readonly listByCustomerQuery: ListShipmentsByCustomerQuery,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo shipment' })
  async create(@Body() dto: CreateShipmentDto): Promise<ShipmentResponseDto> {
    return this.createShipmentCommand.execute({
      orderId: dto.orderId,
      customerId: dto.customerId,
      simId: dto.simId,
      iccid: dto.iccid,
      address: {
        zipCode: dto.addressZipCode,
        street: dto.addressStreet,
        number: dto.addressNumber,
        complement: dto.addressComplement,
        neighborhood: dto.addressNeighborhood,
        city: dto.addressCity,
        state: dto.addressState,
      },
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar shipments por customerId' })
  async listByCustomer(@Query('customerId') customerId: string): Promise<ShipmentResponseDto[]> {
    return this.listByCustomerQuery.execute(customerId);
  }

  @Get('by-order/:orderId')
  @ApiOperation({ summary: 'Buscar shipment por orderId' })
  async getByOrderId(@Param('orderId') orderId: string): Promise<ShipmentResponseDto> {
    return this.getByOrderIdQuery.execute(orderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar shipment por ID' })
  async getById(@Param('id') id: string): Promise<ShipmentResponseDto> {
    return this.getByIdQuery.execute(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status do shipment' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateShipmentStatusDto,
  ): Promise<ShipmentResponseDto> {
    return this.updateShipmentStatusCommand.execute({
      shipmentId: id,
      status: dto.status,
      notes: dto.notes,
    });
  }

  @Post('webhooks/carrier')
  @ApiOperation({ summary: 'Webhook da transportadora para atualizar status' })
  async carrierWebhook(@Body() dto: UpdateShipmentStatusDto & { shipmentId: string }): Promise<ShipmentResponseDto> {
    return this.updateShipmentStatusCommand.execute({
      shipmentId: dto.shipmentId,
      status: dto.status,
      notes: dto.notes,
    });
  }
}
