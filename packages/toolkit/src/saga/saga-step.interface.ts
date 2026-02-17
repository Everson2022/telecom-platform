export type SagaStepStatus =
  | 'PENDING'
  | 'EXECUTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'COMPENSATING'
  | 'COMPENSATED';

export type SagaStatus =
  | 'RUNNING'
  | 'COMPLETED'
  | 'COMPENSATING'
  | 'COMPENSATED'
  | 'FAILED';

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
