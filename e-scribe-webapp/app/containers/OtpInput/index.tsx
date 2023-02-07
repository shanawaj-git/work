import React, { useState, useEffect } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Typography, Button, TypographyType } from '@albathanext/design-system';
import { Redirect } from 'react-router-dom';
import appConfigs from 'configs/applicationConfig.json';
import ScrollLock from 'react-scrolllock';
import { viewPortHandler } from 'utils/viewPortHandler';
import { isNumeric } from 'utils/phoneNumber';
import { AuthErrorCode, AuthMutations } from 'features/auth/api/graphql';
import { useMutation } from '@apollo/client';
import { getReferrer } from 'utils/url';
import SubModule from 'utils/constants/env';
import { Container, ErrorText, LinkText, OtpInput } from './styledComponents';

const RESEND_DELAY_IN_SECONDS = Number(appConfigs.RESEND_OTP_DELAY_IN_SECONDS);
const ONE_SECOND_IN_MILLISECONDS = 1000;
const OPT_CODE_LENGTH = 6;
const OTP_LENGTH = Number(appConfigs.OTP_LENGTH) || OPT_CODE_LENGTH;
const PHONE_LOGIN_SCREEN = 'phone-login';

export const GENERIC_ERROR_CODE = 'genericAPIError';

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
    title: intl.formatMessage({
      id: 'otp.header.title',
      defaultMessage: "Enter the code we've sent to you",
    }),
    description: intl.formatMessage({
      id: 'otp.header.description',
      defaultMessage:
        'Enter the 6-digit code we just sent it to +971-xyz-xyzxx-xx',
    }),
    formLabel: intl.formatMessage({
      id: 'otp.input.label',
      defaultMessage: 'verification code',
    }),
    formLinkHint: intl.formatMessage({
      id: 'otp.input.link.hint',
      defaultMessage: "Didn't receive code ? ",
    }),
    formLinkText: intl.formatMessage({
      id: 'otp.input.link.label',
      defaultMessage: 'Resend',
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
      defaultMessage: 'Next',
    }),
    // TODO: The UX in cases of error and error messages are to be defined
    [AuthErrorCode.MaxAttemptsExceeded]: intl.formatMessage({
      id: 'phoneLogin.error.maxAttemptsExceeded',
      defaultMessage: 'Maximum attempts exceeded',
    }),
    [AuthErrorCode.InvalidCredentials]: intl.formatMessage({
      id: 'phoneLogin.error.invalidCredentials',
      defaultMessage: 'Invalid OTP',
    }),
    [AuthErrorCode.ExpiredOTP]: intl.formatMessage({
      id: 'phoneLogin.error.expiredOTP',
      defaultMessage: 'The entered OTP is expired',
    }),
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'phoneLogin.genericAPIError',
      defaultMessage: 'Sorry, something went wrong',
    }),
  };

  const [resendErrorCode, setResendErrorCode] = useState('');
  const [generateOTP] = useMutation(AuthMutations.GenerateOTP, {
    context: { module: SubModule.AUTHENTICATION },
    variables: {
      input: {
        phoneNumber,
      },
    },
    onCompleted: data => {
      if (data.generateOTP.success) {
        setCounter(RESEND_DELAY_IN_SECONDS);
      } else {
        setResendErrorCode(data.generateOTP.error.code || GENERIC_ERROR_CODE);
      }
    },
    onError: () => {
      setResendErrorCode(GENERIC_ERROR_CODE);
    },
  });

  const [validationErrorCode, setValidationErrorCode] = useState('');
  const [validateOTP] = useMutation(AuthMutations.ValidateOTP, {
    context: { module: SubModule.AUTHENTICATION },
    variables: {
      input: {
        phoneNumber,
        otp,
      },
    },
    onCompleted: data => {
      if (data.validateOTP.success) {
        history.push({
          pathname: referrer,
        });
      } else {
        setValidationErrorCode(
          data.validateOTP.error.code || GENERIC_ERROR_CODE,
        );
      }
    },
    onError: () => {
      setValidationErrorCode(GENERIC_ERROR_CODE);
    },
  });

  const resetErrors = () => {
    setValidationErrorCode(null);
    setResendErrorCode(null);
  };

  const resendHandler = () => {
    resetErrors();
    generateOTP();
  };

  const validationHandler = () => {
    resetErrors();
    validateOTP();
  };

  const getErrorMessage = code =>
    messages[code] || messages[GENERIC_ERROR_CODE];

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
        <div>
          <Typography typographyType="largeTitle" className="spacing">
            {messages.title}
          </Typography>
          <Typography className="spacing" typographyType="subHead">
            {messages.description}
          </Typography>
          <OtpInput
            className="otp-input"
            label={messages.formLabel}
            onChange={handleChange}
            type="tel"
            value={otp}
          />
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
