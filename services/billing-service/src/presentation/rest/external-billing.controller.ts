import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterExternalBillingCommand } from '../../application/commands/register-external-billing.command';
import { ExternalBillingRepository } from '../../infrastructure/database/repositories/external-billing.repository';
import { RegisterExternalBillingDto } from '../dto/register-external-billing.dto';

@ApiTags('external-billing')
@Controller('external-billing')
export class ExternalBillingController {
  constructor(
    private readonly registerCommand: RegisterExternalBillingCommand,
    private readonly externalBillingRepo: ExternalBillingRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar referencia de cobrança externa (pos-pago)' })
  async register(@Body() dto: RegisterExternalBillingDto) {
    return this.registerCommand.execute(dto);
  }

  @Get('by-subscription/:subscriptionId')
  @ApiOperation({ summary: 'Buscar referencia externa por assinatura' })
  async getBySubscription(@Param('subscriptionId') subscriptionId: string) {
    return this.externalBillingRepo.findBySubscriptionId(subscriptionId);
  }
}
