import React from 'react';
import { render as rtlrender } from 'react-testing-library';
import { getCityAndCountry } from 'utils/utils';
import { AddressComponentHeader } from '../AddressComponentHeader';
describe('Map.js', () => {
  let container = null;

  describe('index', () => {
    window.MutationObserver = require('@sheerun/mutationobserver-shim');
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      // cleanup on exiting
      // unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it('Should import succesfully', () => {
      const { container: cont, rerender } = rtlrender(
        <AddressComponentHeader
          selectedAddress={JSON.parse(
            '{"formatted_address":"Selexiq Educational Services, Al Abraj Street, Business Bay Dubai, United Arab Emirates","types":["place","facilities"],"address_components":[{"types":["country"],"long_name":"United Arab Emirates","short_name":"ARE"},{"types":["county"],"long_name":"Dubai","short_name":"Dubai"},{"long_name":"Dubai","short_name":"Dubai","types":["locality"]},{"long_name":"Business Bay","short_name":"Business Bay","types":["district"]},{"long_name":"Al Abraj Street","short_name":"Al Abraj Street","types":["route"]}],"geometry":{"location_type":"APPROXIMATE","location":{"lat":25.18478,"lng":55.25984}},"distance":13}',
          )}
        />,
      );

      rerender(
        <AddressComponentHeader
          selectedAddress={JSON.parse(
            '{"formatted_address":"Selexiq Educational Services, Al Abraj Street, Business Bay Dubai, United Arab Emirates","types":["place","facilities"],"address_components":[{"types":["country"],"long_name":"United Arab Emirates","short_name":"ARE"},{"types":["county"],"long_name":"Dubai","short_name":"Dubai"},{"long_name":"Dubai","short_name":"Dubai","types":["locality"]},{"long_name":"Business Bay","short_name":"Business Bay","types":["district"]},{"long_name":"Al Abraj Street","short_name":"Al Abraj Street","types":["route"]}],"geometry":{"location_type":"APPROXIMATE","location":{"lat":25.18478,"lng":55.25984}},"distance":13}',
          )}
        />,
      );
      expect(cont).toMatchSnapshot();
    });
    it('Should Return The Proper Respnse', async () => {
      const addressComponents = JSON.parse(
        '[{"types":["country"],"long_name":"United Arab Emirates","short_name":"ARE"},{"types":["county"],"long_name":"Dubai","short_name":"Dubai"},{"long_name":"Dubai","short_name":"Dubai","types":["locality"]},{"long_name":"Business Bay","short_name":"Business Bay","types":["district"]},{"long_name":"Al Abraj Street","short_name":"Al Abraj Street","types":["route"]}]',
      );
      await getCityAndCountry(addressComponents);
      expect(getCityAndCountry(addressComponents)).toEqual({
        city: 'Dubai',
        country: 'United Arab Emirates',
      });
    });
  });
});

// ('{"addressComponents":["The Offices 4, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 4, One Central - Dubai - United Arab Emirates","placeId":"ChIJQyW8GyxDXz4R4FQsIlMe5PE","api":"places"}');
