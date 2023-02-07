import { getAPIClientInstance } from './client';
import { Payment } from './types';

export const Urls = {
  PAYMENTS_INITIALIZE: '/api/payments/initialize',
};

export const initializePayment = async (orderId: string): Promise<Payment> =>
  (await getAPIClientInstance().post(Urls.PAYMENTS_INITIALIZE, {
    orderId,
  })).data;
