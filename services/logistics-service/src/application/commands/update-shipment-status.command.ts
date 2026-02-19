import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { ShipmentRepository } from '../../infrastructure/database/repositories/shipment.repository';
import { LOGISTICS_EVENTS } from '../../domain/events/logistics-events';
import { ShipmentStatus } from '../../domain/enums';
import { ShipmentNotFoundException } from '../../errors';
import { ShipmentRecord } from '../../domain/types';

export type UpdateableShipmentStatus =
  | ShipmentStatus.IN_TRANSIT
  | ShipmentStatus.DELIVERED
  | ShipmentStatus.RETURNED
  | ShipmentStatus.FAILED;

export interface UpdateShipmentStatusInput {
  shipmentId: string;
  status: UpdateableShipmentStatus;
  notes?: string;
}

const STATUS_EVENT_MAP: Record<UpdateableShipmentStatus, string> = {
  [ShipmentStatus.IN_TRANSIT]: LOGISTICS_EVENTS.SHIPMENT_IN_TRANSIT,
  [ShipmentStatus.DELIVERED]: LOGISTICS_EVENTS.SHIPMENT_DELIVERED,
  [ShipmentStatus.RETURNED]: LOGISTICS_EVENTS.SHIPMENT_RETURNED,
  [ShipmentStatus.FAILED]: LOGISTICS_EVENTS.SHIPMENT_FAILED,
};

@Injectable()
export class UpdateShipmentStatusCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly shipmentRepo: ShipmentRepository,
  ) {}

  async execute(input: UpdateShipmentStatusInput): Promise<ShipmentRecord> {
    const shipment = await this.shipmentRepo.findById(input.shipmentId);
    if (!shipment) {
      throw new ShipmentNotFoundException(input.shipmentId);
    }

    const updateData: { status: ShipmentStatus; actualDeliveryDate?: Date } = {
      status: input.status,
    };

    if (input.status === ShipmentStatus.DELIVERED) {
      updateData.actualDeliveryDate = new Date();
    }

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Atualiza status do shipment
      const updated = await tx.shipment.update({
        where: { id: input.shipmentId },
        data: updateData,
      });

      // Adiciona registro no historico
      await tx.shipmentStatusHistory.create({
        data: {
          shipmentId: input.shipmentId,
          status: input.status,
          notes: input.notes ?? null,
        },
      });

      // Emite evento correspondente
      const eventType = STATUS_EVENT_MAP[input.status];
      await this.outboxRepo.create(tx, {
        aggregateId: input.shipmentId,
        aggregateType: 'Shipment',
        eventType,
        payload: {
          shipmentId: input.shipmentId,
          orderId: shipment.orderId,
          customerId: shipment.customerId,
          status: input.status,
          notes: input.notes ?? null,
          ...(input.status === ShipmentStatus.DELIVERED && { actualDeliveryDate: updateData.actualDeliveryDate?.toISOString() }),
        },
      });

      return updated;
    });

    return result;
  }
}
