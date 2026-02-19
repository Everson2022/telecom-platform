import { Injectable } from '@nestjs/common';

export interface CoreProvisionResult {
  coreTransactionId: string;
  success: boolean;
}

@Injectable()
export class FakeNetworkCoreClient {
  // O CORE de rede e fake — sempre retorna sucesso
  async provisionSubscriber(_params: {
    iccid: string;
    imsi?: string;
    msisdn: string;
  }): Promise<CoreProvisionResult> {
    return {
      coreTransactionId: `fake-core-${Date.now()}`,
      success: true,
    };
  }

  async suspendSubscriber(_msisdn: string): Promise<void> {
    // CORE fake: operacao sempre bem-sucedida
  }

  async reactivateSubscriber(_msisdn: string): Promise<void> {
    // CORE fake: operacao sempre bem-sucedida
  }

  async deactivateSubscriber(_msisdn: string): Promise<void> {
    // CORE fake: operacao sempre bem-sucedida
  }
}
