import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CheckParallelSubscriptionsQuery } from '../../src/application/queries/check-parallel-subscriptions.query';
import { PlanType, SubscriptionStatus } from '../../src/domain/enums';

describe('CheckParallelSubscriptionsQuery', () => {
  let query: CheckParallelSubscriptionsQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSubscriptionRepo: any;

  const customerId = '00000000-0000-0000-0000-000000000001';

  const existingControlSubscription = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId,
    planType: PlanType.CONTROL,
    status: SubscriptionStatus.ACTIVE,
    planId: '00000000-0000-0000-0000-000000000002',
    offerId: '00000000-0000-0000-0000-000000000003',
    paymentMethodId: null,
    monthlyAmountCents: 4990,
    currency: 'BRL',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockSubscriptionRepo = {
      findActiveByCustomerAndPlanType: vi.fn().mockResolvedValue(null),
    };

    query = new CheckParallelSubscriptionsQuery(mockSubscriptionRepo);
  });

  it('deve retornar hasActiveSubscription=false quando nao ha assinatura ativa', async () => {
    const result = await query.execute(customerId, PlanType.CONTROL);

    expect(result.hasActiveSubscription).toBe(false);
    expect(result.subscriptionId).toBeNull();
    expect(result.customerId).toBe(customerId);
    expect(result.planType).toBe(PlanType.CONTROL);
  });

  it('deve retornar hasActiveSubscription=true quando ha assinatura ativa do mesmo tipo', async () => {
    mockSubscriptionRepo.findActiveByCustomerAndPlanType.mockResolvedValue(existingControlSubscription);

    const result = await query.execute(customerId, PlanType.CONTROL);

    expect(result.hasActiveSubscription).toBe(true);
    expect(result.subscriptionId).toBe(existingControlSubscription.id);
  });

  it('deve permitir PREPAID se so tem CONTROL ativo', async () => {
    mockSubscriptionRepo.findActiveByCustomerAndPlanType
      .mockImplementation((_cId: string, planType: string) => {
        if (planType === PlanType.CONTROL) return Promise.resolve(existingControlSubscription);
        return Promise.resolve(null);
      });

    const controlResult = await query.execute(customerId, PlanType.CONTROL);
    expect(controlResult.hasActiveSubscription).toBe(true);

    const prepaidResult = await query.execute(customerId, PlanType.PREPAID);
    expect(prepaidResult.hasActiveSubscription).toBe(false);
  });
});
