import { Injectable } from '@nestjs/common';
import { Prisma, CustomerDocument } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerDocumentUncheckedCreateInput, tx?: PrismaTransactionClient): Promise<CustomerDocument> {
    const client = tx ?? this.prisma;
    return client.customerDocument.create({ data });
  }

  async findById(id: string): Promise<CustomerDocument | null> {
    return this.prisma.customerDocument.findUnique({ where: { id } });
  }

  async findByCustomerId(customerId: string): Promise<CustomerDocument[]> {
    return this.prisma.customerDocument.findMany({ where: { customerId } });
  }

  async update(id: string, data: Prisma.CustomerDocumentUpdateInput, tx?: PrismaTransactionClient): Promise<CustomerDocument> {
    const client = tx ?? this.prisma;
    return client.customerDocument.update({ where: { id }, data });
  }
}
