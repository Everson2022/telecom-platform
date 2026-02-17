import { Injectable, NotFoundException } from '@nestjs/common';
import { Email, PhoneNumber, OutboxRepository } from '@telecom/toolkit';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { UpdateCustomerDto } from '../../presentation/dto/update-customer.dto';

@Injectable()
export class UpdateCustomerCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(customerId: string, dto: UpdateCustomerDto) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    const updateData: Record<string, any> = {};
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

    return this.prisma.$transaction(async (tx) => {
      const updated = await (tx as any).customer.update({
        where: { id: customerId },
        data: updateData,
        include: { documents: true, addresses: true },
      });

      await this.outboxRepo.create(tx as any, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.UPDATED,
        payload: { customerId, changes },
      });

      return updated;
    });
  }
}
