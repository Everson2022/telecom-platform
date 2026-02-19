import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';
import { ShipmentRecord, ShipmentWithHistory } from '../../../domain/types';

@Injectable()
export class ShipmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ShipmentCreateInput, tx?: PrismaTransactionClient): Promise<ShipmentRecord> {
    const client = tx ?? this.prisma;
    return client.shipment.create({ data });
  }

  async findById(id: string): Promise<ShipmentWithHistory | null> {
    return this.prisma.shipment.findUnique({ where: { id }, include: { statusHistory: true } });
  }

  async findByOrderId(orderId: string): Promise<ShipmentWithHistory | null> {
    return this.prisma.shipment.findUnique({ where: { orderId }, include: { statusHistory: true } });
  }

  async findByCustomerId(customerId: string): Promise<ShipmentRecord[]> {
    return this.prisma.shipment.findMany({ where: { customerId } });
  }

  async update(id: string, data: Prisma.ShipmentUpdateInput, tx?: PrismaTransactionClient): Promise<ShipmentRecord> {
    const client = tx ?? this.prisma;
    return client.shipment.update({ where: { id }, data });
  }
}
