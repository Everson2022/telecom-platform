import { Injectable } from '@nestjs/common';
import { CustomerNotFoundException } from '../../errors';
import { CustomerAddress } from '@prisma/client';
import { OutboxRepository } from '@telecom/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { CreateAddressDto } from '../../presentation/dto/create-address.dto';

@Injectable()
export class AddAddressCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(customerId: string, dto: CreateAddressDto): Promise<CustomerAddress> {
    const exists = await this.customerRepo.exists(customerId);
    if (!exists) {
      throw new CustomerNotFoundException(customerId);
    }

    const addressId = uuidv4();

    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const address = await tx.customerAddress.create({
        data: {
          id: addressId,
          customerId,
          type: dto.type,
          zipCode: dto.zipCode,
          street: dto.street,
          number: dto.number,
          complement: dto.complement ?? null,
          neighborhood: dto.neighborhood,
          city: dto.city,
          state: dto.state,
          dddCode: dto.dddCode,
          country: dto.country ?? 'BR',
          isDefault: dto.isDefault ?? false,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.ADDRESS_ADDED,
        payload: {
          customerId,
          addressId,
          type: dto.type,
          dddCode: dto.dddCode,
        },
      });

      return address;
    });
  }
}
