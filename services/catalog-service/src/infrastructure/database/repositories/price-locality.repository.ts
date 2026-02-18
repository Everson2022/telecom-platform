import { Injectable } from '@nestjs/common';
import { Prisma, PriceLocality } from '@prisma/client';
import { PrismaService, PrismaTransactionClient } from '../prisma.service';

@Injectable()
export class PriceLocalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(
    where: Prisma.PriceLocalityOfferIdDddCodeCityCompoundUniqueInput,
    create: Prisma.PriceLocalityCreateInput,
    update: Prisma.PriceLocalityUpdateInput,
    tx?: PrismaTransactionClient,
  ): Promise<PriceLocality> {
    const client = tx ?? this.prisma;
    return client.priceLocality.upsert({
      where: { offerId_dddCode_city: where },
      create,
      update,
    });
  }

  async findByOfferId(offerId: string): Promise<PriceLocality[]> {
    return this.prisma.priceLocality.findMany({
      where: { offerId },
      orderBy: { dddCode: 'asc' },
    });
  }

  async findByLocality(offerId: string, dddCode: string, city?: string): Promise<PriceLocality | null> {
    return this.prisma.priceLocality.findFirst({
      where: {
        offerId,
        dddCode,
        city: city ?? null,
        status: 'ACTIVE',
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PriceLocalityWhereInput;
    orderBy?: Prisma.PriceLocalityOrderByWithRelationInput;
  }): Promise<{ data: PriceLocality[]; total: number }> {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      this.prisma.priceLocality.findMany({ skip, take, where, orderBy }),
      this.prisma.priceLocality.count({ where }),
    ]);
    return { data, total };
  }
}
