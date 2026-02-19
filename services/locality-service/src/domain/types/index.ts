import { Prisma } from '@prisma/client';

export type LocalityRecord = Prisma.LocalityGetPayload<Record<string, never>>;
