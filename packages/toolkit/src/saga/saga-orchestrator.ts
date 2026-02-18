import { Logger } from '@nestjs/common';
import {
  SagaStepDefinition,
  SagaStepStatus,
  SagaStatus,
  SagaExecutionState,
} from './saga-step.interface';
import { SagaExecutionRepository } from './saga-execution.repository';

export interface SagaDefinition<TContext = Record<string, unknown>> {
  sagaType: string;
  steps: SagaStepDefinition<TContext>[];
}

export class SagaOrchestrator<TContext = Record<string, unknown>> {
  private readonly logger = new Logger(SagaOrchestrator.name);

  constructor(
    private readonly definition: SagaDefinition<TContext>,
    private readonly repository: SagaExecutionRepository,
  ) {}

  async start(orderId: string, context: TContext): Promise<SagaExecutionState> {
    const execution = await this.repository.create({
      orderId,
      sagaType: this.definition.sagaType,
      steps: this.definition.steps.map((step, index) => ({
        stepName: step.name,
        stepOrder: index,
        status: SagaStepStatus.PENDING,
        retryCount: 0,
      })),
    });

    this.logger.log(
      `Saga ${this.definition.sagaType} started for order ${orderId} [${execution.sagaExecutionId}]`,
    );

    return this.executeNextStep(execution, context);
  }

  async handleStepCompleted(
    sagaExecutionId: string,
    stepName: string,
    context: TContext,
  ): Promise<SagaExecutionState> {
    const execution = await this.repository.findById(sagaExecutionId);
    if (!execution) {
      throw new Error(`Saga execution ${sagaExecutionId} not found`);
    }

    await this.repository.updateStepStatus(sagaExecutionId, stepName, SagaStepStatus.COMPLETED);

    this.logger.log(
      `Step ${stepName} completed in saga ${sagaExecutionId}`,
    );

    const updatedExecution = await this.repository.findById(sagaExecutionId);
    return this.executeNextStep(updatedExecution!, context);
  }

  async handleStepFailed(
    sagaExecutionId: string,
    stepName: string,
    error: string,
    context: TContext,
  ): Promise<SagaExecutionState> {
    const execution = await this.repository.findById(sagaExecutionId);
    if (!execution) {
      throw new Error(`Saga execution ${sagaExecutionId} not found`);
    }

    await this.repository.updateStepStatus(sagaExecutionId, stepName, SagaStepStatus.FAILED, error);

    this.logger.warn(
      `Step ${stepName} failed in saga ${sagaExecutionId}: ${error}`,
    );

    return this.startCompensation(execution, context);
  }

  private async executeNextStep(
    execution: SagaExecutionState,
    context: TContext,
  ): Promise<SagaExecutionState> {
    const nextStep = execution.steps.find((s) => s.status === SagaStepStatus.PENDING);

    if (!nextStep) {
      await this.repository.updateStatus(
        execution.sagaExecutionId,
        SagaStatus.COMPLETED,
      );
      this.logger.log(`Saga ${execution.sagaExecutionId} completed`);
      return { ...execution, status: SagaStatus.COMPLETED, completedAt: new Date() };
    }

    await this.repository.updateStepStatus(
      execution.sagaExecutionId,
      nextStep.stepName,
      SagaStepStatus.EXECUTING,
    );
    await this.repository.updateCurrentStep(
      execution.sagaExecutionId,
      nextStep.stepName,
    );

    const stepDef = this.definition.steps.find((s) => s.name === nextStep.stepName);
    if (!stepDef) {
      throw new Error(`Step definition not found: ${nextStep.stepName}`);
    }

    try {
      await stepDef.execute(context);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return this.handleStepFailed(
        execution.sagaExecutionId,
        nextStep.stepName,
        errorMsg,
        context,
      );
    }

    return { ...execution, currentStep: nextStep.stepName, status: SagaStatus.RUNNING };
  }

  private async startCompensation(
    execution: SagaExecutionState,
    context: TContext,
  ): Promise<SagaExecutionState> {
    await this.repository.updateStatus(execution.sagaExecutionId, SagaStatus.COMPENSATING);
    this.logger.warn(`Starting compensation for saga ${execution.sagaExecutionId}`);

    const completedSteps = execution.steps
      .filter((s) => s.status === SagaStepStatus.COMPLETED)
      .sort((a, b) => {
        const aIndex = this.definition.steps.findIndex((d) => d.name === a.stepName);
        const bIndex = this.definition.steps.findIndex((d) => d.name === b.stepName);
        return bIndex - aIndex;
      });

    for (const step of completedSteps) {
      const stepDef = this.definition.steps.find((s) => s.name === step.stepName);
      if (!stepDef) continue;

      try {
        await this.repository.updateStepStatus(
          execution.sagaExecutionId,
          step.stepName,
          SagaStepStatus.COMPENSATING,
        );

        await stepDef.compensate(context);

        await this.repository.updateStepStatus(
          execution.sagaExecutionId,
          step.stepName,
          SagaStepStatus.COMPENSATED,
        );

        this.logger.log(`Compensated step ${step.stepName} in saga ${execution.sagaExecutionId}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        this.logger.error(
          `Compensation failed for step ${step.stepName} in saga ${execution.sagaExecutionId}: ${errorMsg}`,
        );
        await this.repository.updateStatus(execution.sagaExecutionId, SagaStatus.FAILED);
        return { ...execution, status: SagaStatus.FAILED };
      }
    }

    await this.repository.updateStatus(execution.sagaExecutionId, SagaStatus.COMPENSATED);
    this.logger.log(`Saga ${execution.sagaExecutionId} fully compensated`);

    return { ...execution, status: SagaStatus.COMPENSATED, compensatedAt: new Date() };
  }
}
