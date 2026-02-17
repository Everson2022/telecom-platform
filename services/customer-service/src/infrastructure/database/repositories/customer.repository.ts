import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput, tx?: any): Promise<Customer> {
    const client = tx ?? this.prisma;
    return client.customer.create({ data });
  }

  async findById(id: string, tx?: any) {
    const client = tx ?? this.prisma;
    return client.customer.findUnique({
      where: { id },
      include: { documents: true, addresses: true },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.customer.findUnique({
      where: { cpf },
      include: { documents: true, addresses: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.customer.findUnique({
      where: { email },
      include: { documents: true, addresses: true },
    });
  }

  async update(id: string, data: Prisma.CustomerUpdateInput, tx?: any): Promise<Customer> {
    const client = tx ?? this.prisma;
    return client.customer.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { documents: true, addresses: true },
      }),
      this.prisma.customer.count({ where }),
    ]);
    return { data, total };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.customer.count({ where: { id } });
    return count > 0;
  }
}
