import { Injectable } from '@nestjs/common';
import {
  SagaExecutionRepository,
  CreateSagaExecutionParams,
} from '@telecom/toolkit/saga';
import {
  SagaExecutionState,
  SagaStatus,
  SagaStepStatus,
  SagaStepResult,
} from '@telecom/toolkit/saga';
import { PrismaService } from '../prisma.service';
import { SagaExecutionWithSteps } from '../../../domain/types';

@Injectable()
export class SagaExecutionRepositoryImpl implements SagaExecutionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateSagaExecutionParams): Promise<SagaExecutionState> {
    const record = await this.prisma.sagaExecution.create({
      data: {
        orderId: params.orderId,
        sagaType: params.sagaType,
        status: SagaStatus.RUNNING,
        steps: {
          create: params.steps.map((s) => ({
            stepName: s.stepName,
            stepOrder: s.stepOrder,
            status: s.status,
            retryCount: s.retryCount,
          })),
        },
      },
      include: { steps: true },
    });

    return this.mapToState(record);
  }

  async findById(sagaExecutionId: string): Promise<SagaExecutionState | null> {
    // sagaExecutionId in toolkit maps to prisma's SagaExecution.id
    const record = await this.prisma.sagaExecution.findUnique({
      where: { id: sagaExecutionId },
      include: { steps: true },
    });

    if (!record) return null;
    return this.mapToState(record);
  }

  async findByOrderId(orderId: string): Promise<SagaExecutionState | null> {
    const record = await this.prisma.sagaExecution.findUnique({
      where: { orderId },
      include: { steps: true },
    });

    if (!record) return null;
    return this.mapToState(record);
  }

  async updateStatus(sagaExecutionId: string, status: SagaStatus): Promise<void> {
    const data: {
      status: string;
      completedAt?: Date;
      compensatedAt?: Date;
    } = { status };

    if (status === SagaStatus.COMPLETED) {
      data.completedAt = new Date();
    } else if (status === SagaStatus.COMPENSATED) {
      data.compensatedAt = new Date();
    }

    await this.prisma.sagaExecution.update({
      where: { id: sagaExecutionId },
      data,
    });
  }

  async updateCurrentStep(sagaExecutionId: string, stepName: string): Promise<void> {
    await this.prisma.sagaExecution.update({
      where: { id: sagaExecutionId },
      data: { currentStep: stepName },
    });
  }

  async updateStepStatus(
    sagaExecutionId: string,
    stepName: string,
    status: SagaStepStatus,
    errorMessage?: string,
  ): Promise<void> {
    const data: {
      status: string;
      errorMessage?: string;
      executedAt?: Date;
      compensatedAt?: Date;
    } = { status };

    if (errorMessage !== undefined) {
      data.errorMessage = errorMessage;
    }
    if (status === SagaStepStatus.COMPLETED) {
      data.executedAt = new Date();
    } else if (status === SagaStepStatus.COMPENSATED) {
      data.compensatedAt = new Date();
    }

    await this.prisma.sagaStep.update({
      where: { sagaExecutionId_stepName: { sagaExecutionId, stepName } },
      data,
    });
  }

  private mapToState(record: SagaExecutionWithSteps): SagaExecutionState {
    const steps: SagaStepResult[] = record.steps.map((s) => ({
      stepName: s.stepName,
      status: s.status as SagaStepStatus,
      executedAt: s.executedAt ?? undefined,
      compensatedAt: s.compensatedAt ?? undefined,
      errorMessage: s.errorMessage ?? undefined,
      retryCount: s.retryCount,
    }));

    return {
      sagaExecutionId: record.id, // critical mapping: prisma.id → toolkit.sagaExecutionId
      orderId: record.orderId,
      sagaType: record.sagaType,
      currentStep: record.currentStep,
      status: record.status as SagaStatus,
      steps,
      startedAt: record.startedAt,
      completedAt: record.completedAt ?? undefined,
      compensatedAt: record.compensatedAt ?? undefined,
    };
  }
}
