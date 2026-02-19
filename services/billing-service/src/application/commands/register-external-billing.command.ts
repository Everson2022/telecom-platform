import { Injectable } from '@nestjs/common';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { ExternalBillingRepository } from '../../infrastructure/database/repositories/external-billing.repository';
import { SyncStatus } from '../../domain/enums';
import { ExternalBillingReferenceRecord } from '../../domain/types';

export interface RegisterExternalBillingInput {
  subscriptionId: string;
  externalSystemId: string;
  externalAccountId: string;
}

@Injectable()
export class RegisterExternalBillingCommand {
  constructor(
    private readonly prisma: PrismaService,
    private readonly externalBillingRepo: ExternalBillingRepository,
  ) {}

  async execute(input: RegisterExternalBillingInput): Promise<ExternalBillingReferenceRecord> {
    // Idempotência: retorna existente se já registrado
    const existing = await this.externalBillingRepo.findBySubscriptionId(input.subscriptionId);
    if (existing) {
      return existing;
    }

    const reference = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      return tx.externalBillingReference.create({
        data: {
          subscriptionId: input.subscriptionId,
          externalSystemId: input.externalSystemId,
          externalAccountId: input.externalAccountId,
          syncStatus: SyncStatus.SYNCED,
          lastSyncAt: new Date(),
        },
      });
    });

    return reference;
  }
}
