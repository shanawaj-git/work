import React, { useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes, { InferProps } from 'prop-types';
import { useParams } from 'react-router-dom';
import { Button } from '@albathanext/design-system';

import Loader from 'components/moclecules/Loader';
import { Icon } from '@mui/material';
import * as ordersApi from '../../apis/orders';

import { Order, OrderStatus, PaymentType } from '../../apis/types';
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
  OptionsContainer,
  ButtonLabel,
  OptionContainer,
} from './styledComponents';
import messages from './messages';
const mpcGrayLogo = require('images/mpc_gray.svg');
const logoOnlinePayment = require('images/online-payment.svg');
const logoCashOnDelivery = require('images/cash-on-delivery.svg');
const logoCardOnDelivery = require('images/card-on-delivery.svg');

const PAYMENT_STATUS_PAGE = 'payments/status';
const PAYMENT_INPUT_PAGE = 'payments/input';

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

const Option = ({ intl, text, testid, onClick, icon }: any) => (
  <Button
    data-testid={testid}
    size="large"
    variant="contained"
    onClick={onClick}
  >
    <OptionContainer>
      <ButtonLabel>{intl.formatMessage(text)}</ButtonLabel>
      <Icon>
        <img className="option-icon" alt={text} src={icon} />
      </Icon>
    </OptionContainer>
  </Button>
);

const Options = ({
  order,
  intl,
  history,
}: {
  order: Order;
  intl: any;
  history: any;
}) => {
  const [processing, setProcessing] = useState(false);

  const handleOnlinePayment = () => history.push(PAYMENT_INPUT_PAGE);
  const redirectToOrderStatus = () => history.push(PAYMENT_STATUS_PAGE);

  const confirmPayment = async (type: PaymentType) => {
    try {
      setProcessing(true);
      await ordersApi.confirmPayment(`${order.id}`, type);
    } catch (err) {
      // In case of error too it should redirect to the status page.
    } finally {
      setProcessing(false);
      redirectToOrderStatus();
    }
  };

  const handleCashOnDelivery = () => confirmPayment(PaymentType.CashOnDelivery);
  const handleCardOnDelivery = () => confirmPayment(PaymentType.CardOnDelivery);


  return (
    <>
      {processing && <ProgressBar />}
      {!processing && (
        <>
          <TitleContainer>
            <TitlePrefix>
              {intl.formatMessage(messages.headerPrefix)}
            </TitlePrefix>
            <TitleSuffix>
              {intl.formatMessage(messages.headerSuffix)}
            </TitleSuffix>
          </TitleContainer>
          <AmountContainer>
            <AmountLabel>
              {intl.formatMessage(messages.amountLabel)}
            </AmountLabel>
            <AmountValue>{`${order.currency} ${order.amount}`}</AmountValue>
          </AmountContainer>
          <OptionsContainer>
            <Option
              intl={intl}
              testid="option-online-payment"
              text={messages.onlinePayment}
              onClick={handleOnlinePayment}
              icon={logoOnlinePayment}
            />
            <Option
              intl={intl}
              testid="option-cash-on-delivery"
              text={messages.cashOnDelivery}
              icon={logoCashOnDelivery}
              onClick={handleCashOnDelivery}
            />
            <Option
              intl={intl}
              testid="option-card-on-delivery"
              text={messages.cardOnDelivery}
              icon={logoCardOnDelivery}
              onClick={handleCardOnDelivery}
            />
          </OptionsContainer>
        </>
      )}
    </>
  );
};

const PaymentOptions = ({ history, intl }: PaymentOptionsProps) => {
  const { orderId } = useParams();

  const [orderDetails, setOrderDetails] = useState<Order>(null);

  const redirectToOrderStatus = () => history.push(PAYMENT_STATUS_PAGE);

  const fetchOrderDetails = async (id: string) => {
    try {
      const order = await ordersApi.fetchOrderDetails(id);
      if (!validOrderStatuses.includes(order.status)) {
        redirectToOrderStatus();
        return;
      }
      setOrderDetails(order);
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      const responseStatus = err.response?.status;
      if (responseStatus !== 401 && responseStatus !== 403)
        redirectToOrderStatus();
    }
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const initialized = !!orderDetails;

  return (
    <MainContainer>
      <MpcLogo src={mpcGrayLogo} />
      {!initialized && <ProgressBar />}
      {initialized && (
        <Options order={orderDetails} intl={intl} history={history} />
      )}
    </MainContainer>
  );
};

const PaymentOptionsPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  intl: intlShape,
};

type PaymentOptionsProps = InferProps<typeof PaymentOptionsPropTypes>;

PaymentOptions.propTypes = PaymentOptionsPropTypes;

export default injectIntl(PaymentOptions);
