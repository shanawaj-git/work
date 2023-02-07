import { v4 } from 'uuid';
import _debounce from 'lodash/debounce';
/**
 * Helper: Convert Array of coordinates to an object of cordinates
 * @param {*} cordinates : Array [lat,lng]
 * @returns
 */
export const transformedCordinates = cordinates => {
  const [lat, lng] = cordinates;
  return {
    lat,
    lng,
  };
};

export const readableCordinates = ({ lat, lng }) => ({
  lat: lat(),
  lng: lng(),
});

export const uuid = () => v4();

const MAP_ADDRESS_COMPONENT_TYPE = {
  LOCALITY: 'locality',
  COUNTRY: 'country',
};

export const getCityAndCountry = address => {
  let city;
  let country;
  // eslint-disable-next-line no-unused-expressions
  address?.forEach(component => {
    const { types } = component;
    if (types.indexOf(MAP_ADDRESS_COMPONENT_TYPE.LOCALITY) > -1) {
      city = component.long_name;
    }

    if (types.indexOf(MAP_ADDRESS_COMPONENT_TYPE.COUNTRY) > -1) {
      country = component.long_name;
    }
  });
  return {
    city,
    country,
  };
};

export const debounce = (func, wait) => _debounce(func, wait);

export const canBeRenderedInTypographyComponent = obj =>
  typeof obj === 'string' ||
  obj?.type?.displayName === 'MemoizedFormattedMessage';
