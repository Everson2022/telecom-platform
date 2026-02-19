import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ListBillingCyclesBySubscriptionQuery } from '../../src/application/queries/list-billing-cycles-by-subscription.query';
import { BillingCycleStatus } from '../../src/domain/enums';

describe('ListBillingCyclesBySubscriptionQuery', () => {
  let query: ListBillingCyclesBySubscriptionQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockBillingCycleRepo: any;

  const subscriptionId = '00000000-0000-0000-0000-000000000001';

  const cycles = [
    {
      id: '00000000-0000-0000-0000-000000000010',
      subscriptionId,
      customerId: '00000000-0000-0000-0000-000000000002',
      cycleStartDate: new Date('2026-02-01'),
      cycleEndDate: new Date('2026-02-28'),
      dueDate: new Date('2026-03-10'),
      amountCents: 4990,
      currency: 'BRL',
      status: BillingCycleStatus.PAID,
      paymentTransactionId: '00000000-0000-0000-0000-000000000099',
      invoiceNumber: 'INV-202602-00000000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000011',
      subscriptionId,
      customerId: '00000000-0000-0000-0000-000000000002',
      cycleStartDate: new Date('2026-01-01'),
      cycleEndDate: new Date('2026-01-31'),
      dueDate: new Date('2026-02-10'),
      amountCents: 4990,
      currency: 'BRL',
      status: BillingCycleStatus.PAID,
      paymentTransactionId: '00000000-0000-0000-0000-000000000098',
      invoiceNumber: 'INV-202601-00000000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockBillingCycleRepo = {
      findBySubscriptionId: vi.fn().mockResolvedValue(cycles),
    };

    query = new ListBillingCyclesBySubscriptionQuery(mockBillingCycleRepo);
  });

  it('deve retornar todos os ciclos da assinatura', async () => {
    const result = await query.execute(subscriptionId);

    expect(result).toHaveLength(2);
    expect(mockBillingCycleRepo.findBySubscriptionId).toHaveBeenCalledWith(subscriptionId);
  });

  it('deve retornar lista vazia quando nao ha ciclos', async () => {
    mockBillingCycleRepo.findBySubscriptionId.mockResolvedValue([]);

    const result = await query.execute(subscriptionId);
    expect(result).toHaveLength(0);
  });
});
