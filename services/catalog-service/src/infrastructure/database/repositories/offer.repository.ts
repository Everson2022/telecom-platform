import { Injectable } from '@nestjs/common';
import { Prisma, Offer } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OfferRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OfferCreateInput, tx?: any): Promise<Offer> {
    const client = tx ?? this.prisma;
    return client.offer.create({ data });
  }

  async findById(id: string, tx?: any) {
    const client = tx ?? this.prisma;
    return client.offer.findUnique({
      where: { id },
      include: { plan: true, eligibilityRules: true, localityPrices: true },
    });
  }

  async update(id: string, data: Prisma.OfferUpdateInput, tx?: any): Promise<Offer> {
    const client = tx ?? this.prisma;
    return client.offer.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.OfferWhereInput;
    orderBy?: Prisma.OfferOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      this.prisma.offer.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { plan: true, eligibilityRules: true, localityPrices: true },
      }),
      this.prisma.offer.count({ where }),
    ]);
    return { data, total };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.offer.count({ where: { id } });
    return count > 0;
  }
}
