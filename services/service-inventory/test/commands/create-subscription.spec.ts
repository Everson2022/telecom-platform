import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateSubscriptionCommand } from '../../src/application/commands/create-subscription.command';
import { SubscriptionStatus, LineStatus, PlanType, LineRole, MemberStatus } from '../../src/domain/enums';
import { DuplicatePlanTypeException } from '../../src/errors';

describe('CreateSubscriptionCommand', () => {
  let command: CreateSubscriptionCommand;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPrisma: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSubscriptionRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockServiceLineRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockFamilyGroupRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let txOperations: any[];

  const validInput = {
    customerId: '00000000-0000-0000-0000-000000000001',
    planId: '00000000-0000-0000-0000-000000000002',
    offerId: '00000000-0000-0000-0000-000000000003',
    planType: PlanType.CONTROL,
    paymentMethodId: '00000000-0000-0000-0000-000000000004',
    monthlyAmountCents: 4990,
    line: {
      msisdn: '+5511999998888',
      iccid: '8955011000000000001',
      simType: 'PHYSICAL',
    },
  };

  const createdSubscription = {
    id: '00000000-0000-0000-0000-000000000010',
    customerId: validInput.customerId,
    planId: validInput.planId,
    offerId: validInput.offerId,
    planType: PlanType.CONTROL,
    status: SubscriptionStatus.PENDING_ACTIVATION,
    paymentMethodId: validInput.paymentMethodId,
    monthlyAmountCents: 4990,
    currency: 'BRL',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdLine = {
    id: '00000000-0000-0000-0000-000000000020',
    subscriptionId: createdSubscription.id,
    customerId: validInput.customerId,
    msisdn: validInput.line.msisdn,
    iccid: validInput.line.iccid,
    simType: validInput.line.simType,
    role: LineRole.TITULAR,
    status: LineStatus.PENDING_ACTIVATION,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdFamilyGroup = {
    id: '00000000-0000-0000-0000-000000000030',
    subscriptionId: createdSubscription.id,
    titularCustomerId: validInput.customerId,
    maxMembers: 5,
    members: [
      {
        id: '00000000-0000-0000-0000-000000000040',
        familyGroupId: '00000000-0000-0000-0000-000000000030',
        customerId: validInput.customerId,
        lineId: createdLine.id,
        role: LineRole.TITULAR,
        status: MemberStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const subscriptionWithRelations = {
    ...createdSubscription,
    lines: [createdLine],
    familyGroup: createdFamilyGroup,
  };

  beforeEach(() => {
    txOperations = [];

    mockPrisma = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $transaction: vi.fn(async (fn: any) => {
        const tx = {
          subscription: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'subscription.create', args });
              return createdSubscription;
            }),
          },
          serviceLine: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'serviceLine.create', args });
              return createdLine;
            }),
          },
          familyGroup: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'familyGroup.create', args });
              return createdFamilyGroup;
            }),
          },
          outboxEvent: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: vi.fn(async (args: any) => {
              txOperations.push({ type: 'outboxEvent.create', args });
              return args.data;
            }),
          },
        };
        return fn(tx);
      }),
    };

    mockSubscriptionRepo = {
      findActiveByCustomerAndPlanType: vi.fn().mockResolvedValue(null),
      findByIdWithRelations: vi.fn().mockResolvedValue(subscriptionWithRelations),
    };

    mockServiceLineRepo = {};
    mockFamilyGroupRepo = {};

    command = new CreateSubscriptionCommand(
      mockPrisma,
      mockSubscriptionRepo,
      mockServiceLineRepo,
      mockFamilyGroupRepo,
    );
  });

  it('deve criar assinatura CONTROL com linha titular e grupo familiar', async () => {
    const result = await command.execute(validInput);

    expect(result).toBeDefined();
    expect(result.id).toBe(createdSubscription.id);
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();

    const subscriptionCreate = txOperations.find((op) => op.type === 'subscription.create');
    expect(subscriptionCreate.args.data.planType).toBe(PlanType.CONTROL);
    expect(subscriptionCreate.args.data.status).toBe(SubscriptionStatus.PENDING_ACTIVATION);

    const lineCreate = txOperations.find((op) => op.type === 'serviceLine.create');
    expect(lineCreate.args.data.role).toBe(LineRole.TITULAR);
    expect(lineCreate.args.data.status).toBe(LineStatus.PENDING_ACTIVATION);

    const familyGroupCreate = txOperations.find((op) => op.type === 'familyGroup.create');
    expect(familyGroupCreate).toBeDefined();
    expect(familyGroupCreate.args.data.titularCustomerId).toBe(validInput.customerId);
    expect(familyGroupCreate.args.data.maxMembers).toBe(5);
  });

  it('deve criar assinatura PREPAID sem grupo familiar', async () => {
    const prepaidInput = { ...validInput, planType: PlanType.PREPAID };
    await command.execute(prepaidInput);

    const familyGroupCreate = txOperations.find((op) => op.type === 'familyGroup.create');
    expect(familyGroupCreate).toBeUndefined();
  });

  it('deve emitir eventos subscription.created, line.added e family-group.created no outbox', async () => {
    await command.execute(validInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(3);

    const subscriptionCreatedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.subscription.created',
    );
    expect(subscriptionCreatedEvent).toBeDefined();

    const lineAddedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.line.added',
    );
    expect(lineAddedEvent).toBeDefined();

    const familyGroupCreatedEvent = outboxEvents.find(
      (op) => op.args.data.eventType === 'service-inventory.family-group.created',
    );
    expect(familyGroupCreatedEvent).toBeDefined();
  });

  it('deve lancar DuplicatePlanTypeException se ja existir assinatura ativa do mesmo tipo', async () => {
    mockSubscriptionRepo.findActiveByCustomerAndPlanType.mockResolvedValue(createdSubscription);

    await expect(command.execute(validInput)).rejects.toThrow(DuplicatePlanTypeException);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  it('deve emitir apenas 2 eventos no outbox para plano PREPAID', async () => {
    const prepaidInput = { ...validInput, planType: PlanType.PREPAID };
    await command.execute(prepaidInput);

    const outboxEvents = txOperations.filter((op) => op.type === 'outboxEvent.create');
    expect(outboxEvents).toHaveLength(2);
  });
});
