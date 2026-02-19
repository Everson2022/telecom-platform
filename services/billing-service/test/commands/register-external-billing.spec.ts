import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterExternalBillingCommand } from '../../src/application/commands/register-external-billing.command';
import { SyncStatus } from '../../src/domain/enums';

describe('RegisterExternalBillingCommand', () => {
  let command: RegisterExternalBillingCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockExternalBillingRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const validInput = {
    subscriptionId: '00000000-0000-0000-0000-000000000001',
    externalSystemId: 'EXT-BILLING-001',
    externalAccountId: 'ACC-999',
  };

  const createdReference = {
    id: '00000000-0000-0000-0000-000000000010',
    subscriptionId: validInput.subscriptionId,
    externalSystemId: validInput.externalSystemId,
    externalAccountId: validInput.externalAccountId,
    syncStatus: SyncStatus.SYNCED,
    lastSyncAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          externalBillingReference: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'externalBillingReference.create', args });
              return createdReference;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockExternalBillingRepo = {
      findBySubscriptionId: vi.fn().mockResolvedValue(null),
    };

    command = new RegisterExternalBillingCommand(mockPrisma, mockExternalBillingRepo);
  });

  it('deve registrar referencia externa com syncStatus SYNCED', async () => {
    const result = await command.execute(validInput);

    expect(result.syncStatus).toBe(SyncStatus.SYNCED);
    expect(result.subscriptionId).toBe(validInput.subscriptionId);

    const refCreate = txOperations.find((op) => op.type === 'externalBillingReference.create');
    expect(refCreate.args.data.externalSystemId).toBe(validInput.externalSystemId);
    expect(refCreate.args.data.externalAccountId).toBe(validInput.externalAccountId);
  });

  it('deve ser idempotente — retorna referencia existente sem reprocessar', async () => {
    mockExternalBillingRepo.findBySubscriptionId.mockResolvedValue(createdReference);

    const result = await command.execute(validInput);

    expect(result.id).toBe(createdReference.id);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
