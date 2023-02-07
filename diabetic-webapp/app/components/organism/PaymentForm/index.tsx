import React, { useMemo, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from '@albathanext/design-system';
import PropTypes, { InferProps } from 'prop-types';

import Loader from 'components/moclecules/Loader';
import { colorSelector } from 'themes';
import * as environmentConfig from '../../../configs/environmentConfig';
import { ButtonContainer, Form } from './styledComponents';
import messages from './messages';

const CheckoutForm = ({
  returnUrl,
  intl,
}: {
  returnUrl: string;
  intl: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl,
      },
    });

    setIsLoading(false);
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <ButtonContainer>
        <Button
          data-testid="continueButton"
          size="large"
          variant="contained"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
        >
          {isLoading ? (
            <Loader size={30} />
          ) : (
            <>{intl.formatMessage(messages.continue)}</>
          )}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

const themeVariables = {
  colorPrimary: colorSelector('primary'),
  colorBackground: colorSelector('p400'),
  colorText: colorSelector('p500'),
  colorDanger: colorSelector('error'),
  spacingUnit: '7px',
  borderRadius: '8px',
  fontSizeBase: '15px',
  fontWeightNormal: '600',
};

const PaymentForm = ({ clientSecret, returnUrl, intl }: PaymentFormProps) => {
  const appearance = {
    // theme: 'stripe',
    variables: themeVariables,
  };
  const options = {
    clientSecret,
    appearance,
  };
  const { STRIPE_UI_KEY } = environmentConfig.getEnvironmentConfig();
  const stripePromise = useMemo(() => loadStripe(STRIPE_UI_KEY), [
    STRIPE_UI_KEY,
  ]);
  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm returnUrl={returnUrl} intl={intl} />
    </Elements>
  );
};

const PaymentFormPropTypes = {
  clientSecret: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
  intl: intlShape,
};

type PaymentFormProps = InferProps<typeof PaymentFormPropTypes>;

PaymentForm.propTypes = PaymentFormPropTypes;

export default injectIntl(PaymentForm);
