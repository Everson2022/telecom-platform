import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { ListOffersQueryDto } from '../dto/list-offers-query.dto';
import { OfferResponseDto, OfferListResponseDto } from '../dto/offer-response.dto';
import { CreateOfferCommand } from '../../application/commands/create-offer.command';
import { DeactivateOfferCommand } from '../../application/commands/deactivate-offer.command';
import { GetOfferQuery } from '../../application/queries/get-offer.query';
import { ListOffersQuery } from '../../application/queries/list-offers.query';

@ApiTags('Offers')
@Controller('offers')
export class OfferController {
  constructor(
    private readonly createOffer: CreateOfferCommand,
    private readonly deactivateOffer: DeactivateOfferCommand,
    private readonly getOffer: GetOfferQuery,
    private readonly listOffers: ListOffersQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova oferta' })
  @ApiResponse({ status: 201, description: 'Oferta criada', schema: { properties: { offerId: { type: 'string' } } } })
  @ApiResponse({ status: 400, description: 'Dados invalidos ou plano nao ACTIVE' })
  @ApiResponse({ status: 404, description: 'Plano nao encontrado' })
  async create(@Body() dto: CreateOfferDto) {
    const offerId = await this.createOffer.execute(dto);
    return { offerId };
  }

  @Get()
  @ApiOperation({ summary: 'Listar ofertas (paginado)' })
  @ApiResponse({ status: 200, type: OfferListResponseDto })
  async list(@Query() query: ListOffersQueryDto) {
    return this.listOffers.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar oferta por ID' })
  @ApiResponse({ status: 200, type: OfferResponseDto })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.getOffer.byId(id);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desativar oferta' })
  @ApiResponse({ status: 200, type: OfferResponseDto })
  @ApiResponse({ status: 400, description: 'Oferta nao esta ACTIVE' })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.deactivateOffer.execute(id);
  }
}
