import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestSimSwapDto } from '../dto/request-sim-swap.dto';
import { IdParamDto } from '../dto/id-param.dto';
import { SimSwapResponseDto } from '../dto/sim-swap-response.dto';
import { RequestSimSwapCommand } from '../../application/commands/request-sim-swap.command';
import { CompleteSimSwapCommand } from '../../application/commands/complete-sim-swap.command';
import { GetSimSwapRequestQuery } from '../../application/queries/get-sim-swap-request.query';

@ApiTags('SIM Swaps')
@Controller('sim-swaps')
export class SimSwapController {
  constructor(
    private readonly requestSimSwap: RequestSimSwapCommand,
    private readonly completeSimSwap: CompleteSimSwapCommand,
    private readonly getSimSwapRequest: GetSimSwapRequestQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request a SIM swap' })
  @ApiResponse({ status: 201, type: SimSwapResponseDto })
  @ApiResponse({ status: 400, description: 'New SIM not available' })
  @ApiResponse({ status: 404, description: 'SIM card not found' })
  async request(@Body() dto: RequestSimSwapDto): Promise<SimSwapResponseDto> {
    return this.requestSimSwap.execute(dto) as Promise<SimSwapResponseDto>;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get SIM swap request by ID' })
  @ApiResponse({ status: 200, type: SimSwapResponseDto })
  @ApiResponse({ status: 404, description: 'SIM swap request not found' })
  async findById(@Param() params: IdParamDto): Promise<SimSwapResponseDto> {
    return this.getSimSwapRequest.execute(params.id) as Promise<SimSwapResponseDto>;
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete a SIM swap' })
  @ApiResponse({ status: 200, type: SimSwapResponseDto })
  @ApiResponse({ status: 404, description: 'SIM swap request not found' })
  async complete(@Param() params: IdParamDto): Promise<SimSwapResponseDto> {
    return this.completeSimSwap.execute(params.id) as Promise<SimSwapResponseDto>;
  }
}
