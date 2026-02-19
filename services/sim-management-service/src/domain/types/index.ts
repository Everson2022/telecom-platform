import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SimCardRecord = Prisma.SimCardGetPayload<{}>;

export type SimImportBatchWithErrors = Prisma.SimImportBatchGetPayload<{
  include: { errors: true };
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SimSwapRequestRecord = Prisma.SimSwapRequestGetPayload<{}>;
