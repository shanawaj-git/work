import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes, { any, InferProps } from 'prop-types';
import { MapWrapper } from '@albathanext/design-system';
import './globalOverride.css';
import { getAddress } from '../../utils/map';
import * as environmentConfig from '../../configs/environmentConfig';

export const GENERIC_ERROR_CODE = 'genericAPIError';
const REDIRECTION_PATH = 'schedule-selection';
const SCOPE = 'AddressSelection';

export const MAP_INITIAL_COORDINATES = {
  LAT: 25.402278314343096,
  LONG: 55.521545870325006,
};
function AddressSelection({
  intl,
  history,
  woosMapKey,
  googlePlacesKey,
  googleMapKey,
}: AddressSelectionTypes) {
  const messages = {
    title: intl.formatMessage({
      id: `${SCOPE}.title`,
      defaultMessage: 'Where would you like',
    }),
    subTitle: intl.formatMessage({
      id: `${SCOPE}.subTitle`,
      defaultMessage: 'your meds delivered to?',
    }),
  };

  const handleChange = mapOutput => {
    const address = getAddress(mapOutput);
    history.push({
      pathname: REDIRECTION_PATH,
      state: { address },
    });
  };

  const onSaveAddressClick = data => {
    handleChange(data);
  };

  const {
    WOOS_MAP_KEY,
    GOOGLE_PLACES_KEY,
    GOOGLE_MAP_KEY,
  } = environmentConfig.getEnvironmentConfig();

  const props = {
    mapProps: {
      initalCordinates: [
        MAP_INITIAL_COORDINATES.LAT,
        MAP_INITIAL_COORDINATES.LONG,
      ],
    },
    woosMapKey: woosMapKey || WOOS_MAP_KEY,
    googlePlacesKey: googlePlacesKey || GOOGLE_PLACES_KEY,
    googleMapKey: googleMapKey || GOOGLE_MAP_KEY,
    title: messages.title,
    subTitle: messages.subTitle,
  };

  return (
    <>
      <MapWrapper {...props} onSave={onSaveAddressClick} />
    </>
  );
}

const AddressSelectionTypesPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  woosMapKey: PropTypes.string,
  googlePlacesKey: PropTypes.string,
  googleMapKey: PropTypes.string,
};

type AddressSelectionTypes = InferProps<typeof AddressSelectionTypesPropTypes>;

AddressSelection.propTypes = AddressSelectionTypesPropTypes;

export default injectIntl(AddressSelection);
