import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetLocalityByDddQuery } from '../../src/application/queries/get-locality-by-ddd.query';

describe('GetLocalityByDddQuery', () => {
  let query: GetLocalityByDddQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLocalityRepo: any;

  const localities = [
    {
      id: '00000000-0000-0000-0000-000000000010',
      dddCode: '11',
      city: 'Sao Paulo',
      state: 'SP',
      region: 'Sudeste',
      ibgeCode: '3550308',
      hasCoverage: true,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000011',
      dddCode: '11',
      city: 'Guarulhos',
      state: 'SP',
      region: 'Sudeste',
      ibgeCode: '3518800',
      hasCoverage: true,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockLocalityRepo = {
      findByDddCode: vi.fn().mockResolvedValue(localities),
    };

    query = new GetLocalityByDddQuery(mockLocalityRepo);
  });

  it('deve retornar lista de localidades por DDD', async () => {
    const result = await query.execute('11');

    expect(result).toHaveLength(2);
    expect(mockLocalityRepo.findByDddCode).toHaveBeenCalledWith('11');
    expect(result[0].dddCode).toBe('11');
  });

  it('deve retornar lista vazia para DDD sem localidades', async () => {
    mockLocalityRepo.findByDddCode.mockResolvedValue([]);

    const result = await query.execute('99');

    expect(result).toHaveLength(0);
  });
});
