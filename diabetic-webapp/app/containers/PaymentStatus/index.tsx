import React, {useEffect, useState} from 'react';
import PropTypes, {any, InferProps} from 'prop-types';
import {injectIntl} from 'react-intl';
import {useParams} from 'react-router-dom';
import {Typography, TypographyType} from '@albathanext/design-system';
import ReactHtmlParser from 'react-html-parser';
import * as orderApis from 'apis/orders';
import {
  HeaderImage,
  PaidToLogo,
  PaymentDetailContainer,
  PaymentDetailsRow,
  PaymentHeader,
  PaymentMethodHeader,
  PaymentMethodLogoImage,
  PaymentMethodSubHeading,
  PaymentRowDetailContainer,
  PaymentStatusContainer,
  PaymentStatusContent,
  PaymentStatusDescription, RetryPaymentButton,
} from './styledComponents';
import messages from './messages';
import {
  Order,
  Payment,
  PaymentStatus as TPaymentStatus,
  PaymentSubType, PaymentType,
} from '../../apis/types';
import {concatSupportPhoneNumber} from "../../utils/phoneNumber";

const headerImage = require('images/educationImage2.svg');
const masterCardLogo = require('images/mastercard-logo.svg');
const googlePayLogo = require('images/googlePayLogo.svg');
const applePayLogo = require('images/applePayLogo.svg');
const visaCardLogo = require('images/visa-logo.svg');
const defaultPaymentLogo = require('images/cash.svg');
const mpcLogo = require('images/mpc_logo.svg');
const paymentMethodLogos = {
  [PaymentSubType.ApplePay]: applePayLogo,
  [PaymentSubType.GooglePay]: googlePayLogo,
  [PaymentSubType.Visa]: visaCardLogo,
  [PaymentSubType.Mastercard]: masterCardLogo,
  [PaymentSubType.Cash]: defaultPaymentLogo,
};

const isCashOrCardOnDelivery = (paymentDetails: Payment) =>
  // eslint-disable-next-line prettier/prettier
  [PaymentType.CashOnDelivery, PaymentType.CardOnDelivery].includes(paymentDetails?.paymentType);

const PaymentMethodLogo = ({
  paymentMethodSubType,
}: {
  paymentMethodSubType: PaymentSubType;
}) => (
  <PaymentMethodLogoImage
    data-testid={`payment-method-logo-${paymentMethodSubType}`}
    src={paymentMethodLogos[paymentMethodSubType] || defaultPaymentLogo}
  />
);

const PaymentDetails = ({
  intl,
  paymentDetails,
}: {
  intl: any;
  paymentDetails: Payment;
}) => (
  <PaymentDetailContainer>
    <PaymentDetailsRow>
      <PaidToLogo src={mpcLogo} />
      <PaymentRowDetailContainer>
        <PaymentMethodHeader variant="h2">
          {intl.formatMessage(messages.paymentPayedTo)}
        </PaymentMethodHeader>
        <PaymentMethodSubHeading variant="subtitle1">
          {intl.formatMessage(messages.pharmacyName)}
        </PaymentMethodSubHeading>
      </PaymentRowDetailContainer>
    </PaymentDetailsRow>
    <PaymentDetailsRow>
      <PaymentMethodLogo paymentMethodSubType={paymentDetails.paymentSubType} />
      <PaymentRowDetailContainer>
        <PaymentMethodHeader variant="h2">
          {intl.formatMessage(messages.paymentMethod)}
        </PaymentMethodHeader>
        <PaymentMethodSubHeading variant="subtitle1">
          {PaymentType.Cash === paymentDetails.paymentType
            ? intl.formatMessage(messages.cashPaymentMethod)
            : `A/c xxxx${paymentDetails.maskedCardNumber}`}
        </PaymentMethodSubHeading>
      </PaymentRowDetailContainer>
    </PaymentDetailsRow>
  </PaymentDetailContainer>
);

function PaymentStatus({ intl , history}: PaymentStatusTypes) {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<Order>();
  const [error, setError] = useState(null);
  const supportPhoneNumber = concatSupportPhoneNumber('9524389675346')
  const PAYMENT_INPUT_SCREEN = '../payments';

  const paymentRetryHandle = async () => {
    history.push(PAYMENT_INPUT_SCREEN);

  }
  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  async function fetchOrderDetails(id) {
    try {
      setOrderDetails(await orderApis.fetchOrderDetails(id));
    } catch (e) {
      setError('payment.status.api.failed');
    }
  }

  const { payment } = orderDetails || {};

  const cashOrCardOnDelivery = isCashOrCardOnDelivery(payment);

  const showPaymentDetails =
    // eslint-disable-next-line prettier/prettier
    !error && payment?.status === TPaymentStatus.Succeeded;

  // eslint-disable-next-line no-nested-ternary
  const paymentModeLabel = cashOrCardOnDelivery
    ? payment.paymentType === PaymentType.CashOnDelivery
      ? intl.formatMessage(messages.labelCashOnDelivery)
      : intl.formatMessage(messages.labelCardOnDelivery)
    : '';
      
  const statusMessagesMap = {
    success: {
      headerSuffix: intl.formatMessage(messages.paymentHeaderSuffixSuccess),
      description: intl.formatMessage(messages.paymentDescriptionSuccess),
      actionLabel: '',
    },
    failed: {
      headerSuffix: intl.formatMessage(messages.paymentHeaderSuffixFailed),
      description: ReactHtmlParser(intl.formatMessage(messages.paymentDescriptionFailed, {href: supportPhoneNumber})),
      actionLabel: intl.formatMessage(messages.retryPayment),
    },
    cashOrCardOnDelivery: {
      headerSuffix: paymentModeLabel,
      description: intl.formatMessage(
        messages.paymentDescriptionPending,
        { paymentMode: paymentModeLabel },
      ),
      actionLabel: intl.formatMessage(messages.changePaymentMode),
    }
  }
  
  // eslint-disable-next-line no-nested-ternary
  const statusMessages = showPaymentDetails
    ? statusMessagesMap.success
    : cashOrCardOnDelivery
      ? statusMessagesMap.cashOrCardOnDelivery
      : statusMessagesMap.failed;

  /**
   * Timebeing disabling change mode on cash/card on delivery
   * as the email is being sent to the pharmacist upon selection.
   * Need to finalize the flow to re-enable change option
   * */
  const showActionButton = !!orderDetails && !showPaymentDetails && !cashOrCardOnDelivery;

  return (
    <PaymentStatusContainer>
      <HeaderImage>
        <img src={headerImage} alt="payment-confirmation-img" height="50px" />
      </HeaderImage>
      {(orderDetails || error) && <PaymentStatusContent>
        <PaymentHeader>
          <Typography typographyType={TypographyType.TITLE_1}>
            {intl.formatMessage(messages.paymentHeaderPrefix)}
          </Typography>
          <Typography
            data-testid="payment-status"
            typographyType={TypographyType.LARGE_TITLE}
          >
            { statusMessages.headerSuffix }
          </Typography>
        </PaymentHeader>
        <PaymentStatusDescription>
          <Typography data-testid="payment-description" typographyType={TypographyType.SUB_HEAD} >
            { statusMessages.description }
          </Typography>
        </PaymentStatusDescription>
        {showPaymentDetails && (
          <PaymentDetails intl={intl} paymentDetails={orderDetails.payment}/>
        )}
      </PaymentStatusContent>}
      {showActionButton && <RetryPaymentButton onClick={paymentRetryHandle}>{ statusMessages.actionLabel }</RetryPaymentButton>}
    </PaymentStatusContainer>
  );
}

const PaymentStatusPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};

type PaymentStatusTypes = InferProps<typeof PaymentStatusPropTypes>;

PaymentStatus.propTypes = PaymentStatusPropTypes;

export default injectIntl(PaymentStatus);
