export type CreatePaymentRequest = {
  idempotenceKey: string;
  amount: {
    value: string;
    currency: string;
  };
  payment_method: {
    type: 'card' | 'credit' | 'phone';
  };
  confirmation: {
    type: 'redirect' | 'qr';
    return_url: string;
  };
  description?: string;
};

export type CreatePaymentResponse = {
  id: string;
  status: 'pending' | 'canceled' | 'succeeded';
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: 'redirect' | 'qr';
    return_url: string;
    confirmation_url: string;
  };
  description?: string;
};

export interface MockPaymentProviderInterface {
  createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse>;
}
