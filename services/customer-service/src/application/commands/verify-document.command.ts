import { Injectable, NotFoundException } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { DocumentRepository } from '../../infrastructure/database/repositories/document.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';

@Injectable()
export class VerifyDocumentCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentRepo: DocumentRepository,
  ) {}

  async execute(customerId: string, documentId: string) {
    const document = await this.documentRepo.findById(documentId);
    if (!document || document.customerId !== customerId) {
      throw new NotFoundException(`Document ${documentId} not found for customer ${customerId}`);
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await (tx as any).customerDocument.update({
        where: { id: documentId },
        data: { verified: true },
      });

      await this.outboxRepo.create(tx as any, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.DOCUMENT_VERIFIED,
        payload: { customerId, documentId },
      });

      return updated;
    });
  }
}
