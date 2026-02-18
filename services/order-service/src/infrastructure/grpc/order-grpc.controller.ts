import { Injectable, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcLoggingInterceptor, GrpcErrorMappingInterceptor } from '@telecom/toolkit/grpc';
import { GetOrderQuery } from '../../application/queries/get-order.query';
import { OrderWithItems } from '../../domain/types';
import { GetOrderByIdDto } from './dto/get-order-by-id.dto';

interface OrderItemGrpcResponse {
  id: string;
  offerId: string;
  quantity: number;
  priceAmountCents: number;
  priceCurrency: string;
}

interface OrderGrpcResponse {
  id: string;
  customerId: string;
  type: string;
  status: string;
  totalAmountCents: number;
  currency: string;
  paymentMethodType: string;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  items: OrderItemGrpcResponse[];
}

@Injectable()
@UseInterceptors(GrpcLoggingInterceptor, GrpcErrorMappingInterceptor)
export class OrderGrpcController {
  constructor(private readonly getOrderQuery: GetOrderQuery) {}

  @GrpcMethod('OrderQueryService', 'GetOrderById')
  async getOrderById(data: GetOrderByIdDto): Promise<OrderGrpcResponse> {
    const order = await this.getOrderQuery.byId(data.orderId);
    return this.mapOrderToResponse(order);
  }

  private mapOrderToResponse(order: OrderWithItems): OrderGrpcResponse {
    return {
      id: order.id,
      customerId: order.customerId,
      type: order.type,
      status: order.status,
      totalAmountCents: order.totalAmountCents,
      currency: order.currency,
      paymentMethodType: order.paymentMethodType,
      failureReason: order.failureReason,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      completedAt: order.completedAt?.toISOString() ?? null,
      items: order.items.map((item) => ({
        id: item.id,
        offerId: item.offerId,
        quantity: item.quantity,
        priceAmountCents: item.priceAmountCents,
        priceCurrency: item.priceCurrency,
      })),
    };
  }
}
