import { getAPIClientInstance } from './client';
import {
  OrdersInitializeResponse,
  OrdersInitializeRequest,
  Order,
  PaymentType,
} from './types';

const Urls = {
  ORDERS_INITIALIZE: '/api/orders/initialize',
  orderDetails: (id: string) => `/api/orders/${id}`,
  confirmPayment: (id: string) => `/api/orders/${id}/payments/confirmation`,
};

enum Errors {
  PrescriptionNotFound = 'order.prescription.not.found',
  OrderAlreadyExists = 'order.already.exits',
}

const initializeOrder = async (
  orderInitializeRequest: OrdersInitializeRequest,
): Promise<OrdersInitializeResponse> => {
  try {
    return (await getAPIClientInstance().post(
      Urls.ORDERS_INITIALIZE,
      orderInitializeRequest,
    )).data;
  } catch (error) {
    const { response: { status = undefined } = {} } = error;
    if (status === 404) {
      throw new Error(Errors.PrescriptionNotFound);
    } else if (status === 409) {
      throw new Error(Errors.OrderAlreadyExists);
    } else {
      throw error;
    }
  }
};

const fetchOrderDetails = async (orderId: string): Promise<Order> => {
  return (await getAPIClientInstance().get(Urls.orderDetails(orderId))).data;
};

const confirmPayment = async (
  orderId: string,
  type?: PaymentType,
): Promise<Order> => {
  const args: [any] = [Urls.confirmPayment(orderId)];
  if(type) {
    args.push({
      paymentMethod: type,
    });
  }
  return (await getAPIClientInstance().put(...args)).data;
};

export {
  initializeOrder,
  fetchOrderDetails,
  confirmPayment,
  Urls as OrdersApiUrls,
  Errors as OrderApiErrors,
};
