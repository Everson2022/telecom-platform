import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dto/id-param.dto';
import { SimImportBatchResponseDto } from '../dto/sim-import-batch-response.dto';
import { GetSimImportBatchQuery } from '../../application/queries/get-sim-import-batch.query';

@ApiTags('SIM Import Batches')
@Controller('sim-import-batches')
export class SimImportBatchController {
  constructor(private readonly getSimImportBatch: GetSimImportBatchQuery) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get SIM import batch by ID' })
  @ApiResponse({ status: 200, type: SimImportBatchResponseDto })
  @ApiResponse({ status: 404, description: 'SIM import batch not found' })
  async findById(@Param() params: IdParamDto): Promise<SimImportBatchResponseDto> {
    return this.getSimImportBatch.execute(params.id) as Promise<SimImportBatchResponseDto>;
  }
}
