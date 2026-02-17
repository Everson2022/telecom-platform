import { Injectable } from '@nestjs/common';
import { Prisma, CustomerAddress } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerAddressUncheckedCreateInput, tx?: PrismaTransactionClient): Promise<CustomerAddress> {
    const client = tx ?? this.prisma;
    return client.customerAddress.create({ data });
  }

  async findById(id: string): Promise<CustomerAddress | null> {
    return this.prisma.customerAddress.findUnique({ where: { id } });
  }

  async findByCustomerId(customerId: string): Promise<CustomerAddress[]> {
    return this.prisma.customerAddress.findMany({ where: { customerId } });
  }

  async update(id: string, data: Prisma.CustomerAddressUpdateInput, tx?: PrismaTransactionClient): Promise<CustomerAddress> {
    const client = tx ?? this.prisma;
    return client.customerAddress.update({ where: { id }, data });
  }
}
