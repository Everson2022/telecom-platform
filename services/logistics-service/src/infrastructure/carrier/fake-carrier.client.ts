import { Injectable } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';

export interface DispatchResult {
  trackingCode: string;
  estimatedDeliveryDays: number;
}

@Injectable()
export class FakeCarrierClient {
  async dispatchShipment(_iccid: string, _address: object): Promise<DispatchResult> {
    return {
      trackingCode: `FAKE-${uuidv7().substring(0, 8).toUpperCase()}`,
      estimatedDeliveryDays: 5,
    };
  }
}
