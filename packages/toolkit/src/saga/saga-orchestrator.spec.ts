import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SagaOrchestrator, SagaDefinition } from './saga-orchestrator';
import { SagaExecutionRepository } from './saga-execution.repository';
import { SagaExecutionState, SagaStepResult } from './saga-step.interface';

function createMockRepository(): SagaExecutionRepository {
  let state: SagaExecutionState;

  return {
    create: vi.fn(async (params) => {
      state = {
        sagaExecutionId: 'saga-1',
        orderId: params.orderId,
        sagaType: params.sagaType,
        currentStep: null,
        status: 'RUNNING',
        steps: params.steps.map((s) => ({
          stepName: s.stepName,
          status: s.status,
          retryCount: s.retryCount,
        })) as SagaStepResult[],
        startedAt: new Date(),
      };
      return state;
    }),
    findById: vi.fn(async () => state),
    findByOrderId: vi.fn(async () => state),
    updateStatus: vi.fn(async (_id, status) => {
      state = { ...state, status };
    }),
    updateCurrentStep: vi.fn(async (_id, stepName) => {
      state = { ...state, currentStep: stepName };
    }),
    updateStepStatus: vi.fn(async (_id, stepName, status) => {
      state = {
        ...state,
        steps: state.steps.map((s) =>
          s.stepName === stepName ? { ...s, status } : s,
        ),
      };
    }),
  };
}

describe('SagaOrchestrator', () => {
  let repository: SagaExecutionRepository;
  let definition: SagaDefinition;
  let orchestrator: SagaOrchestrator;

  beforeEach(() => {
    repository = createMockRepository();

    definition = {
      sagaType: 'NEW_PLAN_SAGA',
      steps: [
        {
          name: 'allocate_sim',
          execute: vi.fn(async () => {}),
          compensate: vi.fn(async () => {}),
        },
        {
          name: 'process_payment',
          execute: vi.fn(async () => {}),
          compensate: vi.fn(async () => {}),
        },
        {
          name: 'activate_line',
          execute: vi.fn(async () => {}),
          compensate: vi.fn(async () => {}),
        },
      ],
    };

    orchestrator = new SagaOrchestrator(definition, repository);
  });

  it('should start saga and execute first step', async () => {
    const result = await orchestrator.start('order-1', {});

    expect(repository.create).toHaveBeenCalled();
    expect(definition.steps[0].execute).toHaveBeenCalled();
    expect(result.status).toBe('RUNNING');
  });

  it('should advance saga on step completed', async () => {
    await orchestrator.start('order-1', {});
    const result = await orchestrator.handleStepCompleted('saga-1', 'allocate_sim', {});

    expect(definition.steps[1].execute).toHaveBeenCalled();
    expect(result.status).toBe('RUNNING');
  });

  it('should complete saga when all steps done', async () => {
    await orchestrator.start('order-1', {});
    await orchestrator.handleStepCompleted('saga-1', 'allocate_sim', {});
    await orchestrator.handleStepCompleted('saga-1', 'process_payment', {});
    const result = await orchestrator.handleStepCompleted('saga-1', 'activate_line', {});

    expect(result.status).toBe('COMPLETED');
  });

  it('should compensate on step failure', async () => {
    await orchestrator.start('order-1', {});
    await orchestrator.handleStepCompleted('saga-1', 'allocate_sim', {});

    const result = await orchestrator.handleStepFailed(
      'saga-1',
      'process_payment',
      'Payment gateway timeout',
      {},
    );

    expect(result.status).toBe('COMPENSATED');
    expect(definition.steps[0].compensate).toHaveBeenCalled();
  });
});
