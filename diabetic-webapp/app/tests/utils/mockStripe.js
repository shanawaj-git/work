const mockElements = {
  create: jest.fn(),
  getElement: jest.fn(),
};

const mockStripe = {
  elements: jest.fn(),
  createToken: jest.fn(),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  _registerWrapper: jest.fn(),
  confirmPayment: jest.fn(),
};

export default () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe,
  useElements: () => mockElements,
});
