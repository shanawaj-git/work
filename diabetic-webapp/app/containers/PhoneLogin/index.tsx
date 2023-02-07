import React, { useState, useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import { injectIntl } from 'react-intl';
import PropTypes, { any, InferProps } from 'prop-types';
import { Typography, TypographyType, Button } from '@albathanext/design-system';
import {
  sanitizePhoneNumber,
  isValidPhoneNumber,
  isNumeric,
  concatSupportPhoneNumber,
} from 'utils/phoneNumber';
import { viewPortHandler } from 'utils/viewPortHandler';
import { getReferrer } from 'utils/url';
import * as authApis from 'apis/auth';
import {
  Container,
  Wrapper,
  StyledInput,
  ButtonContainer,
  ErrorText,
  ClickHereLink,
  MpcLogo,
  PhoneLoginHeader,
  PhoneLoginDescription,
} from './styledComponents';

const PHONE_NUMBER_DIGITS_COUNT = 12;
const MOBILE_NUMBER_FORMATE = '971xxxxxxxxx';
const OTP_INPUT_SCREEN = 'otp-input';
const mpcGrayLogo = require('images/mpc_gray.svg');
export const GENERIC_ERROR_CODE = 'genericAPIError';

function PhoneLogin({ intl, history, location }: PhoneLoginTypes) {
  const referrer = getReferrer(location);
  const messages = {
    titlePrefix: intl.formatMessage({
      id: 'phoneLogin.titlePrefix',
      defaultMessage: 'What’s your',
    }),
    titleSuffix: intl.formatMessage({
      id: 'phoneLogin.titleSuffix',
      defaultMessage: 'mobile number?',
    }),
    mobileNumber: intl.formatMessage({
      id: 'phoneLogin.mobileNumber',
      defaultMessage: 'Mobile number',
    }),
    mobileNumberInput: intl.formatMessage({
      id: 'phoneLogin.inputMobileMessage',
      defaultMessage: 'Please input the number registered with the clinic.',
    }),
    troubleLoginInMessage: intl.formatMessage({
      id: 'phoneLogin.acceptTermsAndConditions',
      defaultMessage: 'Having trouble logging in? ',
    }),
    clickHere: intl.formatMessage({
      id: 'phoneLogin.clickHere',
      defaultMessage: 'Click here ',
    }),
    next: intl.formatMessage({
      id: 'phoneLogin.next',
      defaultMessage: 'Continue',
    }),
    [authApis.AuthApiErrors.UnknownUser]: intl.formatMessage({
      id: 'phoneLogin.next',
      defaultMessage: 'The mobile number is not registered with us.',
    }),
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'phoneLogin.genericAPIError',
      defaultMessage: 'Sorry, something went wrong',
    }),
  };

  // TODO - Should retrieve it from CMS later
  const supportPhoneNumber = concatSupportPhoneNumber('9524389675346');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    window.visualViewport.addEventListener('resize', viewPortHandler('button'));

    return () => {
      window.visualViewport.removeEventListener(
        'resize',
        viewPortHandler('button'),
      );
    };
  }, [viewPortHandler]);

  const onChange = (event: any): void => {
    const { value } = event.target;

    const sanitizedPhoneNumber = sanitizePhoneNumber(value);
    if (shouldUpdateInputField(sanitizedPhoneNumber)) {
      setPhoneNumber(sanitizedPhoneNumber);
    }
    setErrorCode(null);
  };

  const shouldUpdateInputField = (value: string): boolean => {
    if (
      value.length <= PHONE_NUMBER_DIGITS_COUNT &&
      (isNumeric(value) || value === '')
    ) {
      return true;
    }

    return false;
  };

  const getErrorMessage = code =>
    messages[code] || messages[GENERIC_ERROR_CODE];

  const onNextClick = async () => {
    setErrorCode(null);
    try {
      await authApis.generateOTP(phoneNumber);
      history.push({
        pathname: OTP_INPUT_SCREEN,
        state: { phoneNumber, referrer },
      });
    } catch (err) {
      setErrorCode(err.message);
    }
  };

  return (
    <ScrollLock>
      <Container>
        <MpcLogo src={mpcGrayLogo} />
        <div>
          <Wrapper>
            <PhoneLoginHeader>
              <Typography typographyType={TypographyType.TITLE_1}>
                {messages.titlePrefix}
              </Typography>
              <Typography typographyType={TypographyType.LARGE_TITLE}>
                {messages.titleSuffix}
              </Typography>
            </PhoneLoginHeader>
            <PhoneLoginDescription typographyType={TypographyType.SUB_HEAD}>
              {messages.mobileNumberInput}
            </PhoneLoginDescription>
          </Wrapper>

          <StyledInput
            label={messages.mobileNumber}
            onChange={onChange}
            value={phoneNumber}
            type="tel"
            placeholder={MOBILE_NUMBER_FORMATE}
          />

          <Typography typographyType={TypographyType.CAPTION}>
            {messages.troubleLoginInMessage}
          </Typography>

          <ClickHereLink
            typographyType={TypographyType.CAPTION}
            data-testid="clickHere"
          >
            <a id="contactSupport" href={supportPhoneNumber}>
              {messages.clickHere}
            </a>
          </ClickHereLink>
        </div>

        <ButtonContainer>
          <Button
            data-testid="login-btn"
            variant="contained"
            size="large"
            style={{ width: '100%' }}
            disabled={!isValidPhoneNumber(phoneNumber)}
            onClick={onNextClick}
          >
            <>{messages.next}</>
          </Button>
          {errorCode && (
            <ErrorText data-testid="error-text">
              <Typography typographyType={TypographyType.FOOT_NOTE}>
                {getErrorMessage(errorCode)}
              </Typography>
            </ErrorText>
          )}
        </ButtonContainer>
      </Container>
    </ScrollLock>
  );
}

const PhoneLoginPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      referrer: PropTypes.string.isRequired,
    }),
  }),
};

type PhoneLoginTypes = InferProps<typeof PhoneLoginPropTypes>;

PhoneLogin.propTypes = PhoneLoginPropTypes;

export default injectIntl(PhoneLogin);
