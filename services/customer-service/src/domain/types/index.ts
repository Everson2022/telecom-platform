import { Prisma } from '@prisma/client';

export type CustomerWithRelations = Prisma.CustomerGetPayload<{
  include: { documents: true; addresses: true };
}>;

export type CustomerDocument = Prisma.CustomerDocumentGetPayload<{}>;

export type CustomerAddress = Prisma.CustomerAddressGetPayload<{}>;
