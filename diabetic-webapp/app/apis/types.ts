export type OTPGenerationResponse = {
  success: boolean;
};
export type PrescriptionUploadResponse = {
  id: number;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  blocked: false;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  emiratesId: string;
  reminderFrequency: number;
  createdAt: string;
  updatedAt: string;
};

export type OTPValidationResponse = {
  jwt: string;
  user: AuthUser;
};

export type APIClientOptions = {
  onSuccessfulAuthentication: (response: OTPValidationResponse) => void;
  onUnauthorizedAccess: () => void;
  loginUrl: string;
};

export enum AuthDataKeys {
  Jwt = 'auth_jwt',
  User = 'auth_user',
}

export type OrdersInitializeResponse = {
  id: number;
  schedule: string;
  amount: number;
  currency: string;
  status: string;
  address: Address;
  prescription: Prescription;
};

export type Address = {
  id?: number;
  flatOrVillaNumber: number;
  buildingOrVilla: string;
  street: string;
  area?: string;
  directions?: string;
  latitude: number;
  longitude: number;
};

export type Prescription = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
};

export type OrdersInitializeRequest = {
  prescriptionNumber: string;
  address: Address;
  schedule: string;
};

export enum OrderStatus {
  Pending = 'Pending',
  InsuranceApproved = 'Insurance Approved',
  RequirePayment = 'Require Payment',
  PaymentReceived = 'Payment Received',
  DeliveryScheduled = 'Delivery Scheduled',
  Fulfilled = 'Fulfilled',
  Failed = 'Failed',
  Canceled = 'Canceled',
}

export enum PaymentSubType {
  Mastercard = 'Mastercard',
  Visa = 'Visa',
  ApplePay = 'Apple Pay',
  GooglePay = 'Google Pay',
  Cash = 'Cash',
}
export enum PaymentType {
  Card = 'Card',
  Wallet = 'Wallet',
  Cash = 'Cash',
  CashOnDelivery = 'Cash On Delivery',
  CardOnDelivery = 'Card On Delivery',
}

export enum PaymentStatus {
  Created = 'Created',
  Processing = 'Processing',
  PaymentMethodRequired = 'Payment Method Required',
  ActionRequired = 'ActionRequired',
  Canceled = 'Canceled',
  CaptureRequired = 'CaptureRequired',
  Captured = 'Captured',
  PartiallyCaptured = 'PartiallyCaptured',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Unknown = 'Unknown',
}

export enum Currency {
  AED = 'AED',
}

export type Payment = {
  id: number;
  paymentType: PaymentType;
  paymentSubType: PaymentSubType;
  status: string;
  maskedCardNumber: string;
  providerMetadata: object;
  createdAt: string;
};

export type Order = {
  id: number;
  amount: number;
  currency: Currency;
  status: OrderStatus;
  payment: Payment;
};

export type Pharmacy = {
  pharmacyName: string;
  supportContactNumber: string;
  scheduleWindowDays: number;
  deliveryHours: object;
};
