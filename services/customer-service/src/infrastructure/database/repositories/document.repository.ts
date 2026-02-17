import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerDocumentUncheckedCreateInput, tx?: any) {
    const client = tx ?? this.prisma;
    return client.customerDocument.create({ data });
  }

  async findById(id: string) {
    return this.prisma.customerDocument.findUnique({ where: { id } });
  }

  async findByCustomerId(customerId: string) {
    return this.prisma.customerDocument.findMany({ where: { customerId } });
  }

  async update(id: string, data: Prisma.CustomerDocumentUpdateInput, tx?: any) {
    const client = tx ?? this.prisma;
    return client.customerDocument.update({ where: { id }, data });
  }
}
