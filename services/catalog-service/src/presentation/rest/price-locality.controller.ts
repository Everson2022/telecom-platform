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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SetLocalityPriceDto } from '../dto/set-locality-price.dto';
import { PriceLocalityResponseDto } from '../dto/offer-response.dto';
import { SetLocalityPriceCommand } from '../../application/commands/set-locality-price.command';
import { GetOfferPriceByLocalityQuery } from '../../application/queries/get-offer-price-by-locality.query';
import { PriceLocalityRepository } from '../../infrastructure/database/repositories/price-locality.repository';

@ApiTags('Locality Prices')
@Controller('offers/:offerId/prices')
export class PriceLocalityController {
  constructor(
    private readonly setLocalityPrice: SetLocalityPriceCommand,
    private readonly getOfferPriceByLocality: GetOfferPriceByLocalityQuery,
    private readonly priceLocalityRepo: PriceLocalityRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Definir preco por localidade' })
  @ApiResponse({ status: 201, description: 'Preco definido' })
  @ApiResponse({ status: 400, description: 'Oferta nao esta ACTIVE ou preco invalido' })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async setPrice(
    @Param('offerId', ParseUUIDPipe) offerId: string,
    @Body() dto: SetLocalityPriceDto,
  ) {
    return this.setLocalityPrice.execute(offerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar precos da oferta' })
  @ApiResponse({ status: 200, type: [PriceLocalityResponseDto] })
  async listPrices(@Param('offerId', ParseUUIDPipe) offerId: string) {
    return this.priceLocalityRepo.findByOfferId(offerId);
  }

  @Get('by-locality')
  @ApiOperation({ summary: 'Buscar preco por DDD/cidade' })
  @ApiQuery({ name: 'dddCode', required: true, type: String })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiResponse({ status: 200, type: PriceLocalityResponseDto })
  @ApiResponse({ status: 404, description: 'Oferta nao encontrada' })
  async getByLocality(
    @Param('offerId', ParseUUIDPipe) offerId: string,
    @Query('dddCode') dddCode: string,
    @Query('city') city?: string,
  ) {
    return this.getOfferPriceByLocality.execute(offerId, dddCode, city);
  }
}
