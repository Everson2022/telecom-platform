import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CheckCoverageQuery } from '../../src/application/queries/check-coverage.query';

describe('CheckCoverageQuery', () => {
  let query: CheckCoverageQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLocalityRepo: any;

  beforeEach(() => {
    mockLocalityRepo = {
      hasCoverageByDdd: vi.fn().mockResolvedValue(true),
    };

    query = new CheckCoverageQuery(mockLocalityRepo);
  });

  it('deve retornar hasCoverage=true quando ha localidade com cobertura', async () => {
    const result = await query.execute('11');

    expect(result.dddCode).toBe('11');
    expect(result.hasCoverage).toBe(true);
    expect(mockLocalityRepo.hasCoverageByDdd).toHaveBeenCalledWith('11');
  });

  it('deve retornar hasCoverage=false quando nao ha cobertura no DDD', async () => {
    mockLocalityRepo.hasCoverageByDdd.mockResolvedValue(false);

    const result = await query.execute('99');

    expect(result.dddCode).toBe('99');
    expect(result.hasCoverage).toBe(false);
  });
});
