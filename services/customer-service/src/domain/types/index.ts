import { Prisma } from '@prisma/client';

export type CustomerWithRelations = Prisma.CustomerGetPayload<{
  include: { documents: true; addresses: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CustomerDocument = Prisma.CustomerDocumentGetPayload<{}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CustomerAddress = Prisma.CustomerAddressGetPayload<{}>;
