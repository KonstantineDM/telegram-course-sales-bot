import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  MockPaymentProviderInterface,
} from './mock-payment-provider.interface';

@Injectable()
export class MockPaymentProviderService implements MockPaymentProviderInterface {
  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const id = crypto.randomUUID();
    const payUrl = `https://payment-provider.com/${id}`;

    return {
      id,
      status: 'succeeded',
      amount: {
        value: request.amount.value,
        currency: request.amount.currency,
      },
      confirmation: {
        type: request.confirmation.type,
        return_url: request.confirmation.return_url,
        confirmation_url: payUrl,
      },
    };
  }
}
