import { SagaExecutionState, SagaStatus, SagaStepStatus } from './saga-step.interface';

export interface CreateSagaExecutionParams {
  orderId: string;
  sagaType: string;
  steps: {
    stepName: string;
    stepOrder: number;
    status: SagaStepStatus;
    retryCount: number;
  }[];
}

export interface SagaExecutionRepository {
  create(params: CreateSagaExecutionParams): Promise<SagaExecutionState>;
  findById(sagaExecutionId: string): Promise<SagaExecutionState | null>;
  findByOrderId(orderId: string): Promise<SagaExecutionState | null>;
  updateStatus(sagaExecutionId: string, status: SagaStatus): Promise<void>;
  updateCurrentStep(sagaExecutionId: string, stepName: string): Promise<void>;
  updateStepStatus(
    sagaExecutionId: string,
    stepName: string,
    status: SagaStepStatus,
    errorMessage?: string,
  ): Promise<void>;
}
