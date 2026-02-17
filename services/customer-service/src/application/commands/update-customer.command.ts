import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Email, PhoneNumber, OutboxRepository } from '@telecom/toolkit';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { UpdateCustomerDto } from '../../presentation/dto/update-customer.dto';
import { CustomerWithRelations } from '../../domain/types';

@Injectable()
export class UpdateCustomerCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(customerId: string, dto: UpdateCustomerDto): Promise<CustomerWithRelations> {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    const updateData: Prisma.CustomerUpdateInput = {};
    const changes: Record<string, unknown> = {};

    if (dto.fullName) {
      updateData.fullName = dto.fullName;
      changes.fullName = dto.fullName;
    }

    if (dto.email) {
      const email = Email.create(dto.email);
      updateData.email = email.toString();
      changes.email = email.toString();
    }

    if (dto.phone) {
      const phone = PhoneNumber.create(dto.phone);
      updateData.phone = phone.toString();
      changes.phone = phone.toString();
    }

    if (dto.birthDate) {
      updateData.birthDate = new Date(dto.birthDate);
      changes.birthDate = dto.birthDate;
    }

    if (Object.keys(updateData).length === 0) {
      return customer;
    }

    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const updated = await tx.customer.update({
        where: { id: customerId },
        data: updateData,
        include: { documents: true, addresses: true },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.UPDATED,
        payload: { customerId, changes },
      });

      return updated;
    });
  }
}
