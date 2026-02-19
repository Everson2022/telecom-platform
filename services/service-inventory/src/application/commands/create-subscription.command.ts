import { Injectable } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SubscriptionRepository } from '../../infrastructure/database/repositories/subscription.repository';
import { ServiceLineRepository } from '../../infrastructure/database/repositories/service-line.repository';
import { FamilyGroupRepository } from '../../infrastructure/database/repositories/family-group.repository';
import { SERVICE_INVENTORY_EVENTS } from '../../domain/events/service-inventory-events';
import { SubscriptionStatus, LineStatus, PlanType, LineRole, MemberStatus } from '../../domain/enums';
import { DuplicatePlanTypeException } from '../../errors';
import { SubscriptionWithRelations } from '../../domain/types';

export interface CreateSubscriptionInput {
  customerId: string;
  planId: string;
  offerId: string;
  planType: PlanType;
  paymentMethodId?: string;
  monthlyAmountCents: number;
  currency?: string;
  line: {
    msisdn: string;
    iccid: string;
    simType: string;
  };
}

@Injectable()
export class CreateSubscriptionCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly serviceLineRepo: ServiceLineRepository,
    private readonly familyGroupRepo: FamilyGroupRepository,
  ) {}

  async execute(input: CreateSubscriptionInput): Promise<SubscriptionWithRelations> {
    // Verifica se ja existe assinatura ativa do mesmo tipo
    const existing = await this.subscriptionRepo.findActiveByCustomerAndPlanType(
      input.customerId,
      input.planType,
    );
    if (existing) {
      throw new DuplicatePlanTypeException(input.customerId, input.planType);
    }

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Cria a assinatura
      const subscription = await tx.subscription.create({
        data: {
          customerId: input.customerId,
          planId: input.planId,
          offerId: input.offerId,
          planType: input.planType,
          status: SubscriptionStatus.PENDING_ACTIVATION,
          paymentMethodId: input.paymentMethodId,
          monthlyAmountCents: input.monthlyAmountCents,
          currency: input.currency ?? 'BRL',
        },
      });

      // Cria a linha de servico do titular
      const line = await tx.serviceLine.create({
        data: {
          subscriptionId: subscription.id,
          customerId: input.customerId,
          msisdn: input.line.msisdn,
          iccid: input.line.iccid,
          simType: input.line.simType,
          role: LineRole.TITULAR,
          status: LineStatus.PENDING_ACTIVATION,
        },
      });

      // Cria FamilyGroup para plano CONTROL
      let familyGroup = null;
      if (input.planType === PlanType.CONTROL) {
        familyGroup = await tx.familyGroup.create({
          data: {
            subscriptionId: subscription.id,
            titularCustomerId: input.customerId,
            maxMembers: 5,
            members: {
              create: {
                customerId: input.customerId,
                lineId: line.id,
                role: LineRole.TITULAR,
                status: MemberStatus.ACTIVE,
              },
            },
          },
          include: { members: true },
        });
      }

      // Evento: subscription criada
      await this.outboxRepo.create(tx, {
        aggregateId: subscription.id,
        aggregateType: 'Subscription',
        eventType: SERVICE_INVENTORY_EVENTS.SUBSCRIPTION_CREATED,
        payload: {
          subscriptionId: subscription.id,
          customerId: input.customerId,
          planId: input.planId,
          offerId: input.offerId,
          planType: input.planType,
          monthlyAmountCents: input.monthlyAmountCents,
          currency: subscription.currency,
        },
      });

      // Evento: linha adicionada
      await this.outboxRepo.create(tx, {
        aggregateId: line.id,
        aggregateType: 'ServiceLine',
        eventType: SERVICE_INVENTORY_EVENTS.LINE_ADDED,
        payload: {
          lineId: line.id,
          subscriptionId: subscription.id,
          customerId: input.customerId,
          msisdn: input.line.msisdn,
          iccid: input.line.iccid,
          simType: input.line.simType,
          role: LineRole.TITULAR,
        },
      });

      if (familyGroup) {
        await this.outboxRepo.create(tx, {
          aggregateId: familyGroup.id,
          aggregateType: 'FamilyGroup',
          eventType: SERVICE_INVENTORY_EVENTS.FAMILY_GROUP_CREATED,
          payload: {
            familyGroupId: familyGroup.id,
            subscriptionId: subscription.id,
            titularCustomerId: input.customerId,
            maxMembers: familyGroup.maxMembers,
          },
        });
      }

      return { subscription, familyGroup };
    });

    const withRelations = await this.subscriptionRepo.findByIdWithRelations(result.subscription.id);
    return withRelations!;
  }
}
