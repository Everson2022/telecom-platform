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
import { ImportSimBatchDto } from '../dto/import-sim-batch.dto';
import { AllocateSimDto } from '../dto/allocate-sim.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { ListSimsQueryDto } from '../dto/list-sims-query.dto';
import { SimCardResponseDto, SimCardListResponseDto } from '../dto/sim-card-response.dto';
import { SimImportBatchResponseDto } from '../dto/sim-import-batch-response.dto';
import { ImportSimBatchCommand } from '../../application/commands/import-sim-batch.command';
import { AllocateSimCommand } from '../../application/commands/allocate-sim.command';
import { DeallocateSimCommand } from '../../application/commands/deallocate-sim.command';
import { ActivateSimCommand } from '../../application/commands/activate-sim.command';
import { DeactivateSimCommand } from '../../application/commands/deactivate-sim.command';
import { GetSimByIdQuery } from '../../application/queries/get-sim-by-id.query';
import { ListAvailableSimsQuery } from '../../application/queries/list-available-sims.query';

@ApiTags('SIM Cards')
@Controller('sim-cards')
export class SimCardController {
  constructor(
    private readonly importSimBatch: ImportSimBatchCommand,
    private readonly allocateSim: AllocateSimCommand,
    private readonly deallocateSim: DeallocateSimCommand,
    private readonly activateSim: ActivateSimCommand,
    private readonly deactivateSim: DeactivateSimCommand,
    private readonly getSimById: GetSimByIdQuery,
    private readonly listAvailableSims: ListAvailableSimsQuery,
  ) {}

  @Post('import')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import SIM cards from CSV batch' })
  @ApiResponse({ status: 201, type: SimImportBatchResponseDto })
  async import(@Body() dto: ImportSimBatchDto): Promise<SimImportBatchResponseDto> {
    return this.importSimBatch.execute(dto) as Promise<SimImportBatchResponseDto>;
  }

  @Get()
  @ApiOperation({ summary: 'List SIM cards' })
  @ApiResponse({ status: 200, type: SimCardListResponseDto })
  async list(@Query() query: ListSimsQueryDto): Promise<SimCardListResponseDto> {
    return this.listAvailableSims.execute(query) as Promise<SimCardListResponseDto>;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get SIM card by ID' })
  @ApiResponse({ status: 200, type: SimCardResponseDto })
  @ApiResponse({ status: 404, description: 'SIM card not found' })
  async findById(@Param() params: IdParamDto): Promise<SimCardResponseDto> {
    return this.getSimById.execute(params.id) as Promise<SimCardResponseDto>;
  }

  @Post(':id/allocate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Allocate a SIM card to an order' })
  @ApiResponse({ status: 200, type: SimCardResponseDto })
  @ApiResponse({ status: 404, description: 'No SIM available' })
  async allocate(
    @Param() params: IdParamDto,
    @Body() dto: AllocateSimDto,
  ): Promise<{ simCard: SimCardResponseDto | null }> {
    const simCard = await this.allocateSim.execute(dto);
    return { simCard: simCard as SimCardResponseDto | null };
  }

  @Post(':id/deallocate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deallocate a SIM card' })
  @ApiResponse({ status: 200, type: SimCardResponseDto })
  @ApiResponse({ status: 404, description: 'SIM card not found' })
  async deallocate(@Param() params: IdParamDto): Promise<SimCardResponseDto> {
    return this.deallocateSim.execute(params.id) as Promise<SimCardResponseDto>;
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate a SIM card' })
  @ApiResponse({ status: 200, type: SimCardResponseDto })
  @ApiResponse({ status: 404, description: 'SIM card not found' })
  async activate(@Param() params: IdParamDto): Promise<SimCardResponseDto> {
    return this.activateSim.execute(params.id) as Promise<SimCardResponseDto>;
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a SIM card' })
  @ApiResponse({ status: 200, type: SimCardResponseDto })
  @ApiResponse({ status: 404, description: 'SIM card not found' })
  async deactivate(@Param() params: IdParamDto): Promise<SimCardResponseDto> {
    return this.deactivateSim.execute(params.id) as Promise<SimCardResponseDto>;
  }
}
