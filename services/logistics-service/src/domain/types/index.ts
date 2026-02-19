import { Prisma } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ShipmentRecord = Prisma.ShipmentGetPayload<{}>;
export type ShipmentWithHistory = Prisma.ShipmentGetPayload<{ include: { statusHistory: true } }>;
