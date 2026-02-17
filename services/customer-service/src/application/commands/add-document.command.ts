import { Injectable, NotFoundException } from '@nestjs/common';
import { OutboxRepository } from '@telecom/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { CreateDocumentDto } from '../../presentation/dto/create-document.dto';

@Injectable()
export class AddDocumentCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(customerId: string, dto: CreateDocumentDto) {
    const exists = await this.customerRepo.exists(customerId);
    if (!exists) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    const documentId = uuidv4();

    return this.prisma.$transaction(async (tx) => {
      const document = await (tx as any).customerDocument.create({
        data: {
          id: documentId,
          customerId,
          type: dto.type,
          number: dto.number,
          issuingAuthority: dto.issuingAuthority,
          issueDate: new Date(dto.issueDate),
          expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : null,
        },
      });

      await this.outboxRepo.create(tx as any, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.DOCUMENT_ADDED,
        payload: {
          customerId,
          documentId,
          type: dto.type,
          number: dto.number,
        },
      });

      return document;
    });
  }
}
