import { Injectable } from '@nestjs/common';
import { CpfAlreadyRegisteredException, EmailAlreadyRegisteredException, CustomerRequiresDocumentException, CustomerRequiresAddressException, CustomerRequiresResidentialAddressException } from '../../errors';
import { CPF, Email, PhoneNumber, OutboxRepository } from '@telecom/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { CustomerRepository } from '../../infrastructure/database/repositories/customer.repository';
import { CUSTOMER_EVENTS } from '../../domain/events/customer-events';
import { CreateCustomerDto } from '../../presentation/dto/create-customer.dto';
import { CustomerStatus } from '../../domain/enums';

@Injectable()
export class RegisterCustomerCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<string> {
    const cpf = CPF.create(dto.cpf);
    const email = Email.create(dto.email);
    const phone = PhoneNumber.create(dto.phone);

    const existingByCpf = await this.customerRepo.findByCpf(cpf.toString());
    if (existingByCpf) {
      throw new CpfAlreadyRegisteredException();
    }

    const existingByEmail = await this.customerRepo.findByEmail(email.toString());
    if (existingByEmail) {
      throw new EmailAlreadyRegisteredException();
    }

    if (!dto.documents || dto.documents.length === 0) {
      throw new CustomerRequiresDocumentException();
    }

    if (!dto.addresses || dto.addresses.length === 0) {
      throw new CustomerRequiresAddressException();
    }

    const hasResidential = dto.addresses.some((a) => a.type === 'RESIDENTIAL');
    if (!hasResidential) {
      throw new CustomerRequiresResidentialAddressException();
    }

    const customerId = uuidv4();

    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      await tx.customer.create({
        data: {
          id: customerId,
          fullName: dto.fullName,
          cpf: cpf.toString(),
          birthDate: new Date(dto.birthDate),
          email: email.toString(),
          phone: phone.toString(),
          status: CustomerStatus.ACTIVE,
        },
      });

      for (const doc of dto.documents) {
        await tx.customerDocument.create({
          data: {
            id: uuidv4(),
            customerId,
            type: doc.type,
            number: doc.number,
            issuingAuthority: doc.issuingAuthority,
            issueDate: new Date(doc.issueDate),
            expirationDate: doc.expirationDate ? new Date(doc.expirationDate) : null,
          },
        });
      }

      for (const addr of dto.addresses) {
        await tx.customerAddress.create({
          data: {
            id: uuidv4(),
            customerId,
            type: addr.type,
            zipCode: addr.zipCode,
            street: addr.street,
            number: addr.number,
            complement: addr.complement ?? null,
            neighborhood: addr.neighborhood,
            city: addr.city,
            state: addr.state,
            dddCode: addr.dddCode,
            country: addr.country ?? 'BR',
            isDefault: addr.isDefault ?? false,
          },
        });
      }

      await this.outboxRepo.create(tx, {
        aggregateId: customerId,
        aggregateType: 'Customer',
        eventType: CUSTOMER_EVENTS.REGISTERED,
        payload: {
          customerId,
          fullName: dto.fullName,
          cpf: cpf.toString(),
          email: email.toString(),
          phone: phone.toString(),
        },
      });
    });

    return customerId;
  }
}
