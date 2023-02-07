import React, { useState, useEffect } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Typography, Button, TypographyType } from '@albathanext/design-system';
import { Redirect } from 'react-router-dom';
import appConfigs from 'configs/applicationConfig.json';
import ScrollLock from 'react-scrolllock';
import { viewPortHandler } from 'utils/viewPortHandler';
import { concatSupportPhoneNumber, isNumeric } from 'utils/phoneNumber';
import { getReferrer } from 'utils/url';
import * as authApis from 'apis/auth';
import {
  Container,
  ErrorText,
  OtpInput,
  OtpInputDescription,
  OtpInputLoginHeader,
  Wrapper,
  LinkText,
} from './styledComponents';
import { ClickHereLink, MpcLogo } from '../PhoneLogin/styledComponents';

const RESEND_DELAY_IN_SECONDS = Number(appConfigs.RESEND_OTP_DELAY_IN_SECONDS);
const ONE_SECOND_IN_MILLISECONDS = 1000;
const OPT_CODE_LENGTH = 6;
const OTP_LENGTH = Number(appConfigs.OTP_LENGTH) || OPT_CODE_LENGTH;
const PHONE_LOGIN_SCREEN = 'phone-login';
export const GENERIC_ERROR_CODE = 'genericAPIError';
const mpcGrayLogo = require('images/mpc_gray.svg');

function OTPInput({ intl, location, history }: OTPInputTypes) {
  const { state: { phoneNumber } = {} } = location;
  const referrer = getReferrer(location);
  const storedOTPValueAsNumber = Number(
    localStorage.getItem('otp.resend.seconds.remaining'),
  );

  const [otp, setOTP] = useState('');

  const [counter, setCounter] = useState(
    storedOTPValueAsNumber || RESEND_DELAY_IN_SECONDS,
  );

  const shouldUpdateInputField = (value: string): boolean => {
    if (value.length <= Number(OTP_LENGTH)) {
      return true;
    }
    return false;
  };
  const isValidcode = (code: string): boolean => code.length === OTP_LENGTH;
  useEffect(() => {
    window.visualViewport.addEventListener('resize', viewPortHandler('button'));
    return () => {
      window.visualViewport.removeEventListener(
        'resize',
        viewPortHandler('button'),
      );
    };
  }, [viewPortHandler]);
  useEffect(() => {
    localStorage.setItem('otp.resend.seconds.remaining', `${counter}`);
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, ONE_SECOND_IN_MILLISECONDS);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);
  const handleChange = event => {
    const { value } = event.target;
    if (shouldUpdateInputField(value) && isNumeric(value)) {
      setOTP(value);
      resetErrors();
    }
  };

  const messages = {
    titlePrefix: intl.formatMessage({
      id: 'otp.header.titlePrefix',
      defaultMessage: 'Enter the code',
    }),
    titleSuffix: intl.formatMessage({
      id: 'otp.header.titleSuffix',
      defaultMessage: "we've sent you",
    }),
    description: intl.formatMessage(
      {
        id: 'otp.header.description',
        defaultMessage: `Enter the 6-digit code we just sent it to {phoneNumber}`,
      },
      { phoneNumber },
    ),
    formLabel: intl.formatMessage({
      id: 'otp.input.label',
      defaultMessage: 'Verification code',
    }),
    troubleLoginInMessage: intl.formatMessage({
      id: 'otp.input.troubleLogin',
      defaultMessage: 'Having trouble logging in? ',
    }),
    formLinkText: intl.formatMessage({
      id: 'otp.input.link.label',
      defaultMessage: 'Resend',
    }),
    clickHere: intl.formatMessage({
      id: 'otp.input.clickHere',
      defaultMessage: 'Click here ',
    }),
    formLinkTextDisabled: intl.formatMessage(
      {
        id: 'otp.input.counter.label',
        defaultMessage: `Resend in {counter}s`,
      },
      { counter },
    ),
    formButtonText: intl.formatMessage({
      id: 'otp.input.button.label',
      defaultMessage: 'Continue',
    }),
    [authApis.AuthApiErrors.InvalidOTP]: intl.formatMessage({
      id: 'phoneLogin.error.invalidOTP',
      defaultMessage: 'The entered OTP is invalid',
    }),
    [authApis.AuthApiErrors.ExpiredOTP]: intl.formatMessage({
      id: 'phoneLogin.error.expiredOTP',
      defaultMessage: 'The entered OTP is expired',
    }),
    [authApis.AuthApiErrors.WaitToRegenerateOTP]: intl.formatMessage({
      id: 'phoneLogin.error.WaitToRegenerateOTP',
      defaultMessage: `Wait ${RESEND_DELAY_IN_SECONDS} sec to generate OTP`,
    }),
    [authApis.AuthApiErrors.MaxFailedAttempt]: intl.formatMessage({
      id: 'phoneLogin.error.MaxFailedAttempt',
      defaultMessage: 'Max attempt reached',
    }),
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'phoneLogin.genericAPIError',
      defaultMessage: 'Sorry, something went wrong',
    }),
    formLinkHint: intl.formatMessage({
      id: 'otp.input.link.hint',
      defaultMessage: "Didn't receive code ? ",
    }),
  };

  const [validationErrorCode, setValidationErrorCode] = useState('');
  const [resendErrorCode, setResendErrorCode] = useState('');
  const generateOTP = async () => {
    try {
      await authApis.generateOTP(phoneNumber);
      setCounter(RESEND_DELAY_IN_SECONDS);
    } catch (err) {
      setResendErrorCode(err.message);
    }
  };

  const validationHandler = async () => {
    resetErrors();
    try {
      await authApis.validateOTP(phoneNumber, otp);
      history.push(referrer);
    } catch (err) {
      setValidationErrorCode(err.message);
    }
  };

  const resetErrors = () => {
    setValidationErrorCode(null);
    setResendErrorCode(null);
  };

  const resendHandler = () => {
    resetErrors();
    generateOTP();
  };

  const getErrorMessage = code =>
    messages[code] || messages[GENERIC_ERROR_CODE];

  const supportPhoneNumber = concatSupportPhoneNumber('9524389675346');
  const Resend =
    counter === 0 ? (
      <LinkText role="link" onClick={resendHandler} data-testid="resend-link">
        <b>
          <Typography
            typographyType={TypographyType.FOOT_NOTE}
            className="resend-link-text"
          >
            {messages.formLinkText}
          </Typography>
        </b>
      </LinkText>
    ) : (
      <Typography
        className="inline"
        data-testid="counter-value"
        typographyType={TypographyType.FOOT_NOTE}
      >
        {messages.formLinkTextDisabled}
      </Typography>
    );
  if (!phoneNumber) {
    return <Redirect to={PHONE_LOGIN_SCREEN} />;
  }

  return (
    <ScrollLock>
      <Container>
        <MpcLogo src={mpcGrayLogo} />
        <div>
          <Wrapper>
            <OtpInputLoginHeader>
              <Typography typographyType={TypographyType.TITLE_1}>
                {messages.titlePrefix}
              </Typography>
              <Typography typographyType={TypographyType.LARGE_TITLE}>
                {messages.titleSuffix}
              </Typography>
            </OtpInputLoginHeader>
            <OtpInputDescription typographyType={TypographyType.SUB_HEAD}>
              {messages.description}
            </OtpInputDescription>
          </Wrapper>
          <OtpInput
            className="otp-input"
            label={messages.formLabel}
            onChange={handleChange}
            type="text"
            value={otp}
          />
          <div>
            <Typography
              className="inline"
              typographyType={TypographyType.FOOT_NOTE}
            >
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
          <div className="link-resendOtp">
            <Typography
              className="inline"
              typographyType={TypographyType.FOOT_NOTE}
            >
              {messages.formLinkHint}
            </Typography>
            {Resend}
            {resendErrorCode && (
              <ErrorText data-testid="resend-error-text">
                <Typography typographyType={TypographyType.FOOT_NOTE}>
                  {getErrorMessage(resendErrorCode)}
                </Typography>
              </ErrorText>
            )}
          </div>
        </div>
        <div className="btn-container">
          <Button
            data-testid="nextButton"
            size="large"
            variant="contained"
            disabled={!isValidcode(otp)}
            onClick={validationHandler}
          >
            <>{messages.formButtonText}</>
          </Button>
          {validationErrorCode && (
            <ErrorText data-testid="validation-error-text">
              <Typography typographyType={TypographyType.FOOT_NOTE}>
                {getErrorMessage(validationErrorCode)}
              </Typography>
            </ErrorText>
          )}
        </div>
      </Container>
    </ScrollLock>
  );
}

const OTPInputPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      referrer: PropTypes.string,
    }),
  }),
  intl: any,
};

type OTPInputTypes = InferProps<typeof OTPInputPropTypes>;

OTPInput.propTypes = OTPInputPropTypes;

export default injectIntl(OTPInput);
