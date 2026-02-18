import { NotFoundException } from '@nestjs/common';

export class CustomerNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Customer ${id} not found`);
  }

  static byCpf(cpf: string): CustomerNotFoundException {
    return new CustomerNotFoundException(`with CPF ${cpf}`);
  }
}
