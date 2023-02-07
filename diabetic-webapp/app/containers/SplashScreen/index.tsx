import React, { useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import appConfigs from 'configs/applicationConfig.json';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import padding from 'utils/styles';
import { Container, LogoImage } from './styledComponents';

const SEC_TO_MILLISECOND = 1000;
const QUERY_PARAM_REDIRECT = 'redirect';
const PHONE_LOGIN_PATH = '/phone-login';
const EDUCATIONAL_SCREEN = '/educational-screen';

const mpcLogo = require('images/mpc_logo.svg');
const anextLogo = require('images/frame2.svg');

function SplashScreen(props: SplashScreenTypes) {
  const { intl } = props;
  const queryParams = new URLSearchParams(props.location.search);
  const REDIRECTION_PATH =
    queryParams.get(QUERY_PARAM_REDIRECT) || EDUCATIONAL_SCREEN;
  useEffect(() => {
    const timer = setTimeout(() => {
      props.history.push({
        pathname: PHONE_LOGIN_PATH,
        state: {
          referrer: REDIRECTION_PATH,
        },
      });
    }, Number(appConfigs.splashScreenDurationInSec) * SEC_TO_MILLISECOND);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollLock>
      <Container>
        <LogoImage
          alt="Logo"
          src={mpcLogo}
          style={padding(intl.locale, '10px')}
        />
        <LogoImage
          alt="Logo"
          src={anextLogo}
          style={padding(intl.locale, '10px')}
        />
      </Container>
    </ScrollLock>
  );
}

const SplashScreenPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

type SplashScreenTypes = InferProps<typeof SplashScreenPropTypes>;
SplashScreen.defaultProps = {
  location: {
    search: '',
  },
};
SplashScreen.propTypes = SplashScreenPropTypes;

export default injectIntl(SplashScreen);
