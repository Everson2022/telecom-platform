import {
  Controller,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddAddressCommand } from '../../application/commands/add-address.command';
import { CreateAddressDto } from '../dto/create-address.dto';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { AddressResponseDto } from '../dto/customer-response.dto';

@ApiTags('Customer Addresses')
@Controller('customers/:customerId/addresses')
export class AddressController {
  constructor(private readonly addAddress: AddAddressCommand) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar endereco ao cliente' })
  @ApiResponse({ status: 201, type: AddressResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async create(@Param() params: CustomerIdParamDto, @Body() dto: CreateAddressDto) {
    return this.addAddress.execute(params.customerId, dto);
  }
}
