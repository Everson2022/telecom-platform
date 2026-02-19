import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CountActiveLinesQuery } from '../../src/application/queries/count-active-lines.query';

describe('CountActiveLinesQuery', () => {
  let query: CountActiveLinesQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockServiceLineRepo: any;

  const subscriptionId = '00000000-0000-0000-0000-000000000010';

  beforeEach(() => {
    mockServiceLineRepo = {
      countActiveBySubscriptionId: vi.fn().mockResolvedValue(3),
    };

    query = new CountActiveLinesQuery(mockServiceLineRepo);
  });

  it('deve retornar contagem de linhas ativas', async () => {
    const result = await query.execute(subscriptionId);

    expect(result.subscriptionId).toBe(subscriptionId);
    expect(result.count).toBe(3);
    expect(mockServiceLineRepo.countActiveBySubscriptionId).toHaveBeenCalledWith(subscriptionId);
  });

  it('deve retornar zero quando nao ha linhas ativas', async () => {
    mockServiceLineRepo.countActiveBySubscriptionId.mockResolvedValue(0);

    const result = await query.execute(subscriptionId);
    expect(result.count).toBe(0);
  });
});
