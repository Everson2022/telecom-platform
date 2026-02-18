import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterPaymentMethodDto } from '../dto/register-payment-method.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { PaginationQueryDto } from '../dto/list-query.dto';
import { PaymentMethodResponseDto, PaymentMethodListResponseDto } from '../dto/payment-method-response.dto';
import { RegisterPaymentMethodCommand } from '../../application/commands/register-payment-method.command';
import { RemovePaymentMethodCommand } from '../../application/commands/remove-payment-method.command';
import { GetPaymentMethodQuery } from '../../application/queries/get-payment-method.query';
import { ListPaymentMethodsQuery } from '../../application/queries/list-payment-methods.query';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly registerPaymentMethod: RegisterPaymentMethodCommand,
    private readonly removePaymentMethod: RemovePaymentMethodCommand,
    private readonly getPaymentMethod: GetPaymentMethodQuery,
    private readonly listPaymentMethods: ListPaymentMethodsQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar metodo de pagamento' })
  @ApiResponse({ status: 201, schema: { properties: { paymentMethodId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  @ApiResponse({ status: 409, description: 'Metodo de pagamento ja existe para a assinatura' })
  async register(@Body() dto: RegisterPaymentMethodDto) {
    const paymentMethodId = await this.registerPaymentMethod.execute(dto);
    return { paymentMethodId };
  }

  @Get()
  @ApiOperation({ summary: 'Listar metodos de pagamento por cliente' })
  @ApiResponse({ status: 200, type: PaymentMethodListResponseDto })
  async list(@Query('customerId') customerId: string, @Query() query: PaginationQueryDto) {
    return this.listPaymentMethods.execute({ customerId, ...query });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar metodo de pagamento por ID' })
  @ApiResponse({ status: 200, type: PaymentMethodResponseDto })
  @ApiResponse({ status: 404, description: 'Metodo de pagamento nao encontrado' })
  async findById(@Param() params: IdParamDto) {
    return this.getPaymentMethod.byId(params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover metodo de pagamento' })
  @ApiResponse({ status: 204, description: 'Removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Metodo de pagamento nao encontrado' })
  async remove(@Param() params: IdParamDto) {
    await this.removePaymentMethod.execute(params.id);
  }
}
