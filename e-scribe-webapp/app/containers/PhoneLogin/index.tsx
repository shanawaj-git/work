import React, { useState, useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import { useMutation } from '@apollo/client';
import { injectIntl } from 'react-intl';
import PropTypes, { any, InferProps } from 'prop-types';
import {
  Typography,
  TypographyType,
  Button,
  SwipeableDrawer,
} from '@albathanext/design-system';
import {
  sanitizePhoneNumber,
  isValidPhoneNumber,
  isNumeric,
} from 'utils/phoneNumber';
import SubModule from 'utils/constants/env';
import { viewPortHandler } from 'utils/viewPortHandler';
import { AuthErrorCode, AuthMutations } from 'features/auth/api/graphql';
import {
  Container,
  Wrapper,
  StyledInput,
  ButtonContainer,
  ErrorText,
} from './styledComponents';

import { getReferrer } from 'utils/url';

const PHONE_NUMBER_DIGITS_COUNT = 12;
const MOBILE_NUMBER_FORMATE = '971xxxxxxxxx';
const OTP_INPUT_SCREEN = 'otp-input';
export const GENERIC_ERROR_CODE = 'genericAPIError';

function PhoneLogin({ intl, history, location }: PhoneLoginTypes) {
  const referrer = getReferrer(location);
  const messages = {
    title: intl.formatMessage({
      id: 'phoneLogin.title',
      defaultMessage: 'What’s your mobile number?',
    }),
    mobileNumber: intl.formatMessage({
      id: 'phoneLogin.mobileNumber',
      defaultMessage: 'Mobile number',
    }),
    acceptTermsAndConditions: intl.formatMessage({
      id: 'phoneLogin.acceptTermsAndConditions',
      defaultMessage: 'By tapping next, you agree to the ',
    }),
    termsAndConditions: intl.formatMessage({
      id: 'phoneLogin.termsAndConditions',
      defaultMessage: 'Terms & Conditions',
    }),
    next: intl.formatMessage({
      id: 'phoneLogin.next',
      defaultMessage: 'Next',
    }),
    // TODO: The UX in cases of error and error messages are to be defined
    [AuthErrorCode.AwaitingResendDelay]: intl.formatMessage({
      id: 'phoneLogin.error.awaitingResendDelay',
      defaultMessage: 'Please try after some time',
    }),
    [AuthErrorCode.MaxAttemptsExceeded]: intl.formatMessage({
      id: 'phoneLogin.error.maxAttemptsExceeded',
      defaultMessage: 'Maximum attempts exceeded',
    }),
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'phoneLogin.genericAPIError',
      defaultMessage: 'Sorry, something went wrong',
    }),
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [
    isTermsAndConditionsPopUpOpen,
    setIsTermsAndConditionsPopUpOpen,
  ] = useState(false);

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

  const handleTermsAndConditionsClick = () => {
    setIsTermsAndConditionsPopUpOpen(true);
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

  const handleCloseTermsAndConditions = () => {
    setIsTermsAndConditionsPopUpOpen(false);
  };

  // TODO: to be replaced by content coming from CMS
  const renderTermsAndConditions = () => (
    <>
      <div>Terms and conditions:</div>
      <br />
      {Array.from(Array(20).keys()).map(index => (
        <div key={index}>
          <div>you agree to our terms and conditions</div>
          <br />
        </div>
      ))}
    </>
  );

  const [generateOTP, { loading }] = useMutation(AuthMutations.GenerateOTP, {
    context: { module: SubModule.AUTHENTICATION },
    variables: {
      input: {
        phoneNumber,
      },
    },
    onCompleted: data => {
      if (data.generateOTP.success) {
        history.push({
          pathname: OTP_INPUT_SCREEN,
          state: { phoneNumber, referrer },
        });
      } else {
        setErrorCode(data.generateOTP.error.code || GENERIC_ERROR_CODE);
      }
    },
    onError: () => {
      setErrorCode(GENERIC_ERROR_CODE);
    },
  });

  const getErrorMessage = code =>
    messages[code] || messages[GENERIC_ERROR_CODE];

  const onNextClick = () => {
    setErrorCode(null);
    generateOTP();
  };

  return (
    <ScrollLock>
      <Container>
        <div>
          <Wrapper>
            <Typography typographyType={TypographyType.LARGE_TITLE}>
              {messages.title}
            </Typography>
          </Wrapper>

          <StyledInput
            label={messages.mobileNumber}
            onChange={onChange}
            value={phoneNumber}
            type="tel"
            placeholder={MOBILE_NUMBER_FORMATE}
          />

          <Typography typographyType={TypographyType.CAPTION}>
            {messages.acceptTermsAndConditions}
          </Typography>

          <Typography
            onClick={() => handleTermsAndConditionsClick()}
            color="red"
            style={{ textDecoration: 'underline' }}
            typographyType={TypographyType.CAPTION}
            data-testid="termsAndConditionsLink"
          >
            {messages.termsAndConditions}
          </Typography>
        </div>
        <SwipeableDrawer
          isOpen={isTermsAndConditionsPopUpOpen}
          onClose={handleCloseTermsAndConditions}
          onOpen={() => {}}
          hasRoundedCorners
        >
          <div>{renderTermsAndConditions()}</div>
        </SwipeableDrawer>

        <ButtonContainer>
          <Button
            data-testid="login-btn"
            variant="contained"
            size="large"
            style={{ width: '100%' }}
            disabled={!isValidPhoneNumber(phoneNumber) || loading}
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
