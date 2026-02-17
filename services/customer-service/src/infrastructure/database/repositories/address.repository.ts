import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerAddressUncheckedCreateInput, tx?: any) {
    const client = tx ?? this.prisma;
    return client.customerAddress.create({ data });
  }

  async findById(id: string) {
    return this.prisma.customerAddress.findUnique({ where: { id } });
  }

  async findByCustomerId(customerId: string) {
    return this.prisma.customerAddress.findMany({ where: { customerId } });
  }

  async update(id: string, data: Prisma.CustomerAddressUpdateInput, tx?: any) {
    const client = tx ?? this.prisma;
    return client.customerAddress.update({ where: { id }, data });
  }
}
