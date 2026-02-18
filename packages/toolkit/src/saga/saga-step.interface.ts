export const SagaStepStatus = {
  PENDING: 'PENDING',
  EXECUTING: 'EXECUTING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  COMPENSATING: 'COMPENSATING',
  COMPENSATED: 'COMPENSATED',
} as const;

export type SagaStepStatus = (typeof SagaStepStatus)[keyof typeof SagaStepStatus];

export const SagaStatus = {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  COMPENSATING: 'COMPENSATING',
  COMPENSATED: 'COMPENSATED',
  FAILED: 'FAILED',
} as const;

export type SagaStatus = (typeof SagaStatus)[keyof typeof SagaStatus];

export interface SagaStepDefinition<TContext = Record<string, unknown>> {
  name: string;
  execute(context: TContext): Promise<void>;
  compensate(context: TContext): Promise<void>;
}

export interface SagaStepResult {
  stepName: string;
  status: SagaStepStatus;
  executedAt?: Date;
  compensatedAt?: Date;
  errorMessage?: string;
  retryCount: number;
}

export interface SagaExecutionState {
  sagaExecutionId: string;
  orderId: string;
  sagaType: string;
  currentStep: string | null;
  status: SagaStatus;
  steps: SagaStepResult[];
  startedAt: Date;
  completedAt?: Date;
  compensatedAt?: Date;
}
