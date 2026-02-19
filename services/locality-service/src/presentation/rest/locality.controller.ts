import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateLocalityCommand } from '../../application/commands/create-locality.command';
import { UpdateCoverageStatusCommand } from '../../application/commands/update-coverage-status.command';
import { DeactivateLocalityCommand } from '../../application/commands/deactivate-locality.command';
import { GetLocalityByDddQuery } from '../../application/queries/get-locality-by-ddd.query';
import { GetLocalityByCityQuery } from '../../application/queries/get-locality-by-city.query';
import { ListLocalitiesByStateQuery } from '../../application/queries/list-localities-by-state.query';
import { CheckCoverageQuery } from '../../application/queries/check-coverage.query';
import { CreateLocalityDto } from '../dto/create-locality.dto';

@ApiTags('localities')
@Controller('localities')
export class LocalityController {
  constructor(
    private readonly createLocalityCommand: CreateLocalityCommand,
    private readonly updateCoverageStatusCommand: UpdateCoverageStatusCommand,
    private readonly deactivateLocalityCommand: DeactivateLocalityCommand,
    private readonly getLocalityByDddQuery: GetLocalityByDddQuery,
    private readonly getLocalityByCityQuery: GetLocalityByCityQuery,
    private readonly listLocalitiesByStateQuery: ListLocalitiesByStateQuery,
    private readonly checkCoverageQuery: CheckCoverageQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new locality' })
  async create(@Body() dto: CreateLocalityDto) {
    return this.createLocalityCommand.execute(dto);
  }

  @Get('by-ddd/:dddCode')
  @ApiOperation({ summary: 'Get localities by DDD code' })
  async getByDdd(@Param('dddCode') dddCode: string) {
    return this.getLocalityByDddQuery.execute(dddCode);
  }

  @Get('by-city')
  @ApiOperation({ summary: 'Get locality by city name' })
  async getByCity(@Query('city') city: string) {
    return this.getLocalityByCityQuery.execute(city);
  }

  @Get('by-state/:state')
  @ApiOperation({ summary: 'List localities by state' })
  async listByState(@Param('state') state: string) {
    return this.listLocalitiesByStateQuery.execute(state);
  }

  @Get('coverage/:dddCode')
  @ApiOperation({ summary: 'Check coverage by DDD code' })
  async checkCoverage(@Param('dddCode') dddCode: string) {
    return this.checkCoverageQuery.execute(dddCode);
  }

  @Patch(':id/coverage')
  @ApiOperation({ summary: 'Update coverage status of a locality' })
  async updateCoverage(
    @Param('id') id: string,
    @Body('hasCoverage') hasCoverage: boolean,
  ) {
    return this.updateCoverageStatusCommand.execute({ localityId: id, hasCoverage });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deactivate a locality' })
  async deactivate(@Param('id') id: string) {
    await this.deactivateLocalityCommand.execute(id);
  }
}
