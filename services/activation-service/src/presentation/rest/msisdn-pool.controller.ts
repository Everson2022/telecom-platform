import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MsisdnPoolRepository } from '../../infrastructure/database/repositories/msisdn-pool.repository';
import { AddMsisdnBatchDto } from '../dto/add-msisdn.dto';
import { MsisdnResponseDto } from '../dto/msisdn-response.dto';

@ApiTags('msisdn-pool')
@Controller('msisdn-pool')
export class MsisdnPoolController {
  constructor(private readonly msisdnPoolRepo: MsisdnPoolRepository) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar MSISDNs ao pool (admin)' })
  async addMsisdns(@Body() dto: AddMsisdnBatchDto): Promise<{ count: number }> {
    let count = 0;
    for (const item of dto.msisdns) {
      await this.msisdnPoolRepo.create({ msisdn: item.msisdn, dddCode: item.dddCode });
      count++;
    }
    return { count };
  }

  @Get()
  @ApiOperation({ summary: 'Listar MSISDNs do pool' })
  async listMsisdns(
    @Query('dddCode') dddCode?: string,
    @Query('status') status?: string,
  ): Promise<{ data: MsisdnResponseDto[]; total: number }> {
    void status;
    const { data, total } = await this.msisdnPoolRepo.findMany({ dddCode });
    return {
      data: data.map((m) => ({
        id: m.id,
        msisdn: m.msisdn,
        dddCode: m.dddCode,
        status: m.status,
      })),
      total,
    };
  }
}
