/*
 * LoginSelectionScreen
 *
 * This is the screen where user selects the login option(via SMS or UAEPASS)
 *
 */

import React from 'react';
import ScrollLock from 'react-scrolllock';
import PropTypes, { any, InferProps } from 'prop-types';
import { useFlag } from '@unleash/proxy-client-react';
import { injectIntl } from 'react-intl';
import { Button, Typography } from '@albathanext/design-system';
import { Container, StyledHeroSection } from './styledComponents';
import { getReferrer, getMediaURL } from 'utils/url';
const PHONE_LOGIN_SCREEN = 'phone-login';

function LoginSelectionScreen({
  intl,
  history,
  location,
}: LoginSelectionScreenTypes) {
  const titleLogo = getMediaURL(intl, 'next-health-logo-primary.svg');
  const UAEPassLogo = getMediaURL(intl, 'uaepass-logo.svg');
  const referrer = getReferrer(location);
  const messages = {
    title: intl.formatMessage({
      id: 'signin.welcome.title',
      defaultMessage: 'Welcome to',
    }),
    headline: intl.formatMessage({
      id: 'signin.welcome.headline',
      defaultMessage:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    mobileOption: intl.formatMessage({
      id: 'signin.option.mobilenumber',
      defaultMessage: 'Sign in using mobile number',
    }),
    uaePassOption: intl.formatMessage({
      id: 'signin.option.uaepass',
      defaultMessage: 'Sign in with UAE PASS',
    }),
    optionsSeparator: intl.formatMessage({
      id: 'siginin.selection.or',
      defaultMessage: 'OR',
    }),
  };

  const showUAEPassOption = useFlag('uae_pass_login');
  return (
    <ScrollLock>
      <Container>
        <StyledHeroSection
          image={getMediaURL(intl, 'hero-section-image-min.png')}
          title={messages.title}
          headLine={messages.headline}
          titleLogo={titleLogo}
        />
        <div className="signin-options-container">
          <Button
            className="mobile-option-button"
            size="large"
            variant="contained"
            onClick={() =>
              history.push({
                pathname: PHONE_LOGIN_SCREEN,
                state: { referrer },
              })
            }
          >
            <>{messages.mobileOption}</>
          </Button>
          {showUAEPassOption && (
            <>
              <Typography className="orLabel">
                {messages.optionsSeparator}
              </Typography>
              <Button
                className="uaepass-option-button"
                size="large"
                variant="outlined"
              >
                <>
                  <img
                    src={UAEPassLogo}
                    className="uaepass-logo"
                    alt="uae_pass_logo"
                  />
                  {messages.uaePassOption}
                </>
              </Button>
            </>
          )}
        </div>
      </Container>
    </ScrollLock>
  );
}

const LoginSelectionScreenPropTypes = {
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

type LoginSelectionScreenTypes = InferProps<
  typeof LoginSelectionScreenPropTypes
>;

LoginSelectionScreen.propTypes = LoginSelectionScreenPropTypes;

export default injectIntl(LoginSelectionScreen);
