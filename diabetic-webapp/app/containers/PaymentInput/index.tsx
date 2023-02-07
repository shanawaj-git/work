import React, { useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes, { InferProps } from 'prop-types';
import { useParams } from 'react-router-dom';

import Loader from 'components/moclecules/Loader';
import PaymentForm from 'components/organism/PaymentForm';
import * as ordersApi from '../../apis/orders';
import * as paymentsApi from '../../apis/payments';

import { Order, OrderStatus, PaymentStatus } from '../../apis/types';
import {
  TitleContainer,
  LoaderContainer,
  MainContainer,
  MpcLogo,
  TitlePrefix,
  TitleSuffix,
  AmountContainer,
  AmountLabel,
  AmountValue,
} from './styledComponents';
import messages from './messages';
const mpcGrayLogo = require('images/mpc_gray.svg');

const PAYMENT_STATUS_PAGE = 'status';

const validOrderStatuses = [
  OrderStatus.InsuranceApproved,
  OrderStatus.RequirePayment,
];

export const SEARCH_PARAM_CONFIRMATION = 'confirmation';

const ProgressBar = () => (
  <LoaderContainer>
    <Loader size={90} />
  </LoaderContainer>
);

const Form = ({ order, intl }: { order: Order; intl: any }) => {
  // eslint-disable-next-line dot-notation
  const clientSecret = order.payment.providerMetadata['client_secret'];
  const RETURN_URL = `${window.location.href}?${SEARCH_PARAM_CONFIRMATION}`;
  return (
    <>
      <TitleContainer>
        <TitlePrefix>{intl.formatMessage(messages.headerPrefix)}</TitlePrefix>
        <TitleSuffix>{intl.formatMessage(messages.headerSuffix)}</TitleSuffix>
      </TitleContainer>
      <AmountContainer>
        <AmountLabel>{intl.formatMessage(messages.amountLabel)}</AmountLabel>
        <AmountValue>{`${order.currency} ${order.amount}`}</AmountValue>
      </AmountContainer>
      <PaymentForm clientSecret={clientSecret} returnUrl={RETURN_URL} />
    </>
  );
};

const PaymentInput = ({ history, intl, location }: PaymentInputProps) => {
  const { orderId } = useParams();

  const [orderDetails, setOrderDetails] = useState<Order>();

  const redirectToOrderStatus = () => history.push(PAYMENT_STATUS_PAGE);

  const initializePaymentDetails = async () =>
    paymentsApi.initializePayment(orderId);

  const fetchOrderDetails = async (id: string) => {
    try {
      const order = await ordersApi.fetchOrderDetails(id);
      if (!validOrderStatuses.includes(order.status)) {
        redirectToOrderStatus();
        return;
      }
      if (!order.payment || !order.payment.providerMetadata) {
        const payment = await initializePaymentDetails();
        order.payment = { ...payment };
      }

      if (order.payment.status === PaymentStatus.PaymentMethodRequired) {
        setOrderDetails(order);
      } else {
        redirectToOrderStatus();
      }
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      const responseStatus = err?.response?.status;
      if(responseStatus !== 401 && responseStatus !== 403)
        redirectToOrderStatus();
    }
  };

  const confirmPayment = async () => {
    try {
      await ordersApi.confirmPayment(orderId);
    } catch (err) {
      // In case of error too it should redirect to the status page.
    } finally {
      redirectToOrderStatus();
    }
  };

  const isConfirmation = new URLSearchParams(location.search).has(
    SEARCH_PARAM_CONFIRMATION,
  );

  useEffect(() => {
    if (isConfirmation) {
      confirmPayment();
    } else {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const initialized = !!orderDetails;

  return (
    <MainContainer>
      <MpcLogo src={mpcGrayLogo} />
      {!initialized && <ProgressBar />}
      {initialized && <Form order={orderDetails} intl={intl} />}
    </MainContainer>
  );
};

const PaymentInputPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
  intl: intlShape,
};

type PaymentInputProps = InferProps<typeof PaymentInputPropTypes>;

PaymentInput.propTypes = PaymentInputPropTypes;

export default injectIntl(PaymentInput);
