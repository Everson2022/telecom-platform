import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetServiceLineByMsisdnQuery } from '../../application/queries/get-service-line-by-msisdn.query';

@ApiTags('service-lines')
@Controller('service-lines')
export class ServiceLineController {
  constructor(private readonly getByMsisdnQuery: GetServiceLineByMsisdnQuery) {}

  @Get()
  @ApiOperation({ summary: 'Buscar linha de servico por MSISDN' })
  async getByMsisdn(@Query('msisdn') msisdn: string) {
    return this.getByMsisdnQuery.execute(msisdn);
  }
}
