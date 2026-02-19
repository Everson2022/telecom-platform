import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetActivationByOrderIdQuery } from '../../application/queries/get-activation-by-order-id.query';
import { GetActivationByMsisdnQuery } from '../../application/queries/get-activation-by-msisdn.query';
import { ActivationResponseDto } from '../dto/activation-response.dto';

@ApiTags('activations')
@Controller('activations')
export class ActivationController {
  constructor(
    private readonly getByOrderIdQuery: GetActivationByOrderIdQuery,
    private readonly getByMsisdnQuery: GetActivationByMsisdnQuery,
  ) {}

  @Get('by-order/:orderId')
  @ApiOperation({ summary: 'Buscar ativacao por orderId' })
  async getByOrderId(@Param('orderId') orderId: string): Promise<ActivationResponseDto> {
    return this.getByOrderIdQuery.execute(orderId);
  }

  @Get('by-msisdn')
  @ApiOperation({ summary: 'Buscar ativacao por MSISDN' })
  async getByMsisdn(@Query('msisdn') msisdn: string): Promise<ActivationResponseDto> {
    return this.getByMsisdnQuery.execute(msisdn);
  }
}
