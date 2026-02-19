import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetServiceLineByMsisdnQuery } from '../../src/application/queries/get-service-line-by-msisdn.query';
import { LineStatus, LineRole } from '../../src/domain/enums';
import { ServiceLineNotFoundException } from '../../src/errors';

describe('GetServiceLineByMsisdnQuery', () => {
  let query: GetServiceLineByMsisdnQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockServiceLineRepo: any;

  const activeLine = {
    id: '00000000-0000-0000-0000-000000000020',
    subscriptionId: '00000000-0000-0000-0000-000000000010',
    customerId: '00000000-0000-0000-0000-000000000001',
    msisdn: '+5511999998888',
    iccid: '8955011000000000001',
    simType: 'PHYSICAL',
    role: LineRole.TITULAR,
    status: LineStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockServiceLineRepo = {
      findByMsisdn: vi.fn().mockResolvedValue(activeLine),
    };

    query = new GetServiceLineByMsisdnQuery(mockServiceLineRepo);
  });

  it('deve retornar linha de servico por MSISDN', async () => {
    const result = await query.execute('+5511999998888');

    expect(result.msisdn).toBe('+5511999998888');
    expect(result.status).toBe(LineStatus.ACTIVE);
    expect(mockServiceLineRepo.findByMsisdn).toHaveBeenCalledWith('+5511999998888');
  });

  it('deve lancar ServiceLineNotFoundException para MSISDN inexistente', async () => {
    mockServiceLineRepo.findByMsisdn.mockResolvedValue(null);

    await expect(query.execute('+5500000000000')).rejects.toThrow(ServiceLineNotFoundException);
  });
});
