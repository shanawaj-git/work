import React, { useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import appConfigs from 'configs/applicationConfig.json';
import { Container } from './styledComponents';
import PropTypes, { any, InferProps } from 'prop-types';
import { getMediaURL } from 'utils/url';
import { injectIntl } from 'react-intl';

const SEC_TO_MILLISECOND = 1000;
const QUERY_PARAM_REDIRECT = 'redirect';
const LOGIN_SELECTION_PATH = '/login-selection';

function SplashScreen(props: SplashScreenTypes) {
  const { intl } = props;
  const queryParams = new URLSearchParams(props.location.search);
  const REDIRECTION_PATH =
    queryParams.get(QUERY_PARAM_REDIRECT) || LOGIN_SELECTION_PATH;
  useEffect(() => {
    const timer = setTimeout(() => {
      props.history.push({
        pathname: LOGIN_SELECTION_PATH,
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
        <img src={getMediaURL(intl, 'splash-screen-logo.svg')} alt="Logo" />
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
