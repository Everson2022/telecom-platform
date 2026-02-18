import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerStatus } from '../../domain/enums';
import { RegisterCustomerCommand } from '../../application/commands/register-customer.command';
import { UpdateCustomerCommand } from '../../application/commands/update-customer.command';
import { ChangeStatusCommand } from '../../application/commands/change-status.command';
import { GetCustomerQuery } from '../../application/queries/get-customer.query';
import { ListCustomersQuery } from '../../application/queries/list-customers.query';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ListCustomersQueryDto } from '../dto/list-customers-query.dto';
import { CustomerResponseDto, CustomerListResponseDto } from '../dto/customer-response.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly registerCustomer: RegisterCustomerCommand,
    private readonly updateCustomer: UpdateCustomerCommand,
    private readonly changeStatus: ChangeStatusCommand,
    private readonly getCustomer: GetCustomerQuery,
    private readonly listCustomers: ListCustomersQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente cadastrado', schema: { properties: { customerId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  @ApiResponse({ status: 409, description: 'CPF ou email ja cadastrado' })
  async create(@Body() dto: CreateCustomerDto) {
    const customerId = await this.registerCustomer.execute(dto);
    return { customerId };
  }

  @Get()
  @ApiOperation({ summary: 'Listar clientes (paginado)' })
  @ApiResponse({ status: 200, type: CustomerListResponseDto })
  async list(@Query() query: ListCustomersQueryDto) {
    return this.listCustomers.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.getCustomer.byId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do cliente' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.updateCustomer.execute(id, dto);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suspender cliente' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  @ApiResponse({ status: 400, description: 'Transicao de status invalida' })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async suspend(@Param('id', ParseUUIDPipe) id: string) {
    return this.changeStatus.execute(id, CustomerStatus.SUSPENDED);
  }

  @Post(':id/reactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reativar cliente' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  @ApiResponse({ status: 400, description: 'Transicao de status invalida' })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async reactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.changeStatus.execute(id, CustomerStatus.ACTIVE);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar cliente' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  @ApiResponse({ status: 400, description: 'Transicao de status invalida' })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.changeStatus.execute(id, CustomerStatus.CANCELLED);
  }
}
