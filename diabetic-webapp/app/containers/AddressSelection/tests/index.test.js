import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { MapWrapper } from '@albathanext/design-system';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddressSelection from '../index';
import * as environmentConfig from '../../../configs/environmentConfig';

configure({ adapter: new Adapter() });
describe('<AddressSelection />', () => {
  let getEnvironmentConfig;
  beforeEach(() => {
    getEnvironmentConfig = jest.spyOn(
      environmentConfig,
      'getEnvironmentConfig',
    );
    getEnvironmentConfig.mockReturnValue({
      WOOS_MAP_KEY: '1234',
      GOOGLE_PLACES_KEY: '1234',
      GOOGLE_MAP_KEY: 'po',
    });

    document.body.innerHTML = '';
  });

  afterEach(() => {
    getEnvironmentConfig.mockRestore();
  });

  const onSaveMockedData = {
    form: {
      address: '2B Street 42, Al Wasl Dubai, United Arab Emirates',
      flatvillano: 'asdsad',
      flatvillaname: 'asdsad',
    },
    addressFetched: {
      formatted_address: '2B Street 42, Al Wasl Dubai, United Arab Emirates',
      types: ['house_number'],
      address_components: [
        {
          types: ['country'],
          long_name: 'United Arab Emirates',
          short_name: 'ARE',
        },
        {
          types: ['county'],
          long_name: 'Dubai',
          short_name: 'Dubai',
        },
        {
          long_name: 'Dubai',
          short_name: 'Dubai',
          types: ['locality'],
        },
        {
          long_name: 'Al Wasl',
          short_name: 'Al Wasl',
          types: ['district'],
        },
        {
          long_name: '2B Street',
          short_name: '2B Street',
          types: ['route'],
        },
        {
          long_name: '42',
          short_name: '42',
          types: ['street_number'],
        },
      ],
      geometry: {
        location_type: 'ROOFTOP',
        location: {
          lat: 25.19967,
          lng: 55.24964,
        },
        viewport: {
          northeast: {
            lat: 25.20193,
            lng: 55.25135,
          },
          southwest: {
            lat: 25.19841,
            lng: 55.249,
          },
        },
      },
      distance: 14,
    },
  };

  const WrappedAddingAddress = ({
    history,
    woosMapKey,
    googlePlacesKey,
    googleMapKey,
  }) => (
    <BrowserRouter>
      <IntlProvider locale="en">
        <AddressSelection
          history={history}
          woosMapKey={woosMapKey}
          googlePlacesKey={googlePlacesKey}
          googleMapKey={googleMapKey}
        />
      </IntlProvider>
    </BrowserRouter>
  );

  WrappedAddingAddress.propTypes = {
    history: PropTypes.func,
    woosMapKey: PropTypes.string,
    googleMapKey: PropTypes.string,
    googlePlacesKey: PropTypes.string,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  window.matchMedia = jest.fn();
  global.MutationObserver = class {
    constructor(callback) {
      this.callback = callback;
    }

    disconnect() {}

    observe() {}
  };

  it('should save patient address then redirect to the next page', async () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <WrappedAddingAddress
        history={history}
        woosMapKey=""
        googlePlacesKey=""
        googleMapKey=""
      />,
    );
    await wrapper
      .find(MapWrapper)
      .props()
      .onSave(onSaveMockedData);

    await new Promise(resolve => setTimeout(resolve, 0));
    const REDIRECTION_PATH = 'schedule-selection';
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toBeCalledWith({
      pathname: REDIRECTION_PATH,
      state: {
        address: {
          buildingName: 'asdsad',
          flatVillaNumber: 'asdsad',
          formattedText: '2B Street 42, Al Wasl Dubai, United Arab Emirates',
          latitude: 25.19967,
          longitude: 55.24964,
          userNotes: undefined,
        },
      },
    });
  });
});
