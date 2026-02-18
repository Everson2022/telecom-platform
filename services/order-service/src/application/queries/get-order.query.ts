import { Injectable } from '@nestjs/common';
import { OrderNotFoundException } from '../../errors';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { OrderWithItems } from '../../domain/types';

@Injectable()
export class GetOrderQuery {
  constructor(private readonly orderRepo: OrderRepository) {}

  async byId(id: string): Promise<OrderWithItems> {
    const order = await this.orderRepo.findById(id);
    if (!order) {
      throw new OrderNotFoundException(id);
    }
    return order;
  }
}
