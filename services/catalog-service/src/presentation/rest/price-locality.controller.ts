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
import { SetLocalityPriceDto } from '../dto/set-locality-price.dto';
import { OfferIdParamDto } from '../dto/offer-id-param.dto';
import { GetLocalityPriceQueryDto } from '../dto/get-locality-price-query.dto';
import { PriceLocalityResponseDto } from '../dto/offer-response.dto';
import { SetLocalityPriceCommand } from '../../application/commands/set-locality-price.command';
import { GetOfferPriceByLocalityQuery } from '../../application/queries/get-offer-price-by-locality.query';
import { ListLocalityPricesQuery } from '../../application/queries/list-locality-prices.query';

@ApiTags('Locality Prices')
@Controller('offers/:offerId/prices')
export class PriceLocalityController {
  constructor(
    private readonly setLocalityPrice: SetLocalityPriceCommand,
    private readonly getOfferPriceByLocality: GetOfferPriceByLocalityQuery,
    private readonly listLocalityPrices: ListLocalityPricesQuery,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Definir preco por localidade' })
  @ApiResponse({ status: 201, description: 'Preco definido' })
  @ApiResponse({ status: 400, description: 'Oferta nao esta ACTIVE ou preco invalido' })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async setPrice(@Param() params: OfferIdParamDto, @Body() dto: SetLocalityPriceDto) {
    return this.setLocalityPrice.execute(params.offerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar precos da oferta' })
  @ApiResponse({ status: 200, type: [PriceLocalityResponseDto] })
  async listPrices(@Param() params: OfferIdParamDto) {
    return this.listLocalityPrices.byOfferId(params.offerId);
  }

  @Get('by-locality')
  @ApiOperation({ summary: 'Buscar preco por DDD/cidade' })
  @ApiResponse({ status: 200, type: PriceLocalityResponseDto })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async getByLocality(@Param() params: OfferIdParamDto, @Query() query: GetLocalityPriceQueryDto) {
    return this.getOfferPriceByLocality.execute(params.offerId, query.dddCode, query.city);
  }
}
