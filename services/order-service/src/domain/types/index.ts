import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OrderItemRecord = Prisma.OrderItemGetPayload<{}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SagaStepRecord = Prisma.SagaStepGetPayload<{}>;

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: true; sagaExecution: true };
}>;

export type SagaExecutionWithSteps = Prisma.SagaExecutionGetPayload<{
  include: { steps: true };
}>;
