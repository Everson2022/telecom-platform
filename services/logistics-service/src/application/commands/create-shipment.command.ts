import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { ShipmentRepository } from '../../infrastructure/database/repositories/shipment.repository';
import { FakeCarrierClient } from '../../infrastructure/carrier/fake-carrier.client';
import { LOGISTICS_EVENTS } from '../../domain/events/logistics-events';
import { ShipmentStatus } from '../../domain/enums';
import { ShipmentWithHistory } from '../../domain/types';

export interface CreateShipmentInput {
  orderId: string;
  customerId: string;
  simId?: string;
  iccid: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

@Injectable()
export class CreateShipmentCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly shipmentRepo: ShipmentRepository,
    private readonly carrierClient: FakeCarrierClient,
  ) {}

  async execute(input: CreateShipmentInput): Promise<ShipmentWithHistory> {
    // Idempotencia: retorna shipment existente se orderId ja existe
    const existing = await this.shipmentRepo.findByOrderId(input.orderId);
    if (existing) {
      return existing;
    }

    // Chama transportadora fake para obter trackingCode
    const carrierResult = await this.carrierClient.dispatchShipment(input.iccid, input.address);

    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + carrierResult.estimatedDeliveryDays);

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Cria o Shipment com status DISPATCHED
      const shipment = await tx.shipment.create({
        data: {
          orderId: input.orderId,
          customerId: input.customerId,
          simId: input.simId ?? null,
          iccid: input.iccid,
          carrier: 'FakeCarrier',
          trackingCode: carrierResult.trackingCode,
          status: ShipmentStatus.DISPATCHED,
          addressZipCode: input.address.zipCode,
          addressStreet: input.address.street,
          addressNumber: input.address.number,
          addressComplement: input.address.complement ?? null,
          addressNeighborhood: input.address.neighborhood,
          addressCity: input.address.city,
          addressState: input.address.state,
          estimatedDeliveryDate,
        },
      });

      // Cria historico de status: PENDING
      await tx.shipmentStatusHistory.create({
        data: {
          shipmentId: shipment.id,
          status: ShipmentStatus.PENDING,
          notes: 'Shipment created',
        },
      });

      // Cria historico de status: DISPATCHED
      await tx.shipmentStatusHistory.create({
        data: {
          shipmentId: shipment.id,
          status: ShipmentStatus.DISPATCHED,
          notes: `Dispatched by carrier with tracking code ${carrierResult.trackingCode}`,
        },
      });

      // Emite evento logistics.shipment.created
      await this.outboxRepo.create(tx, {
        aggregateId: shipment.id,
        aggregateType: 'Shipment',
        eventType: LOGISTICS_EVENTS.SHIPMENT_CREATED,
        payload: {
          shipmentId: shipment.id,
          orderId: input.orderId,
          customerId: input.customerId,
          iccid: input.iccid,
          trackingCode: carrierResult.trackingCode,
        },
      });

      // Emite evento logistics.shipment.dispatched
      await this.outboxRepo.create(tx, {
        aggregateId: shipment.id,
        aggregateType: 'Shipment',
        eventType: LOGISTICS_EVENTS.SHIPMENT_DISPATCHED,
        payload: {
          shipmentId: shipment.id,
          orderId: input.orderId,
          customerId: input.customerId,
          trackingCode: carrierResult.trackingCode,
          estimatedDeliveryDate: estimatedDeliveryDate.toISOString(),
        },
      });

      return shipment;
    });

    // Retorna com historico incluido
    const withHistory = await this.shipmentRepo.findById(result.id);
    return withHistory!;
  }
}
