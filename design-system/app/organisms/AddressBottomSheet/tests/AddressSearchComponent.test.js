import React from 'react';
import { fireEvent, render as rtlrender } from 'react-testing-library';

import { AddressSearchComponent } from '../AddressSearchComponent';

const searchResults = JSON.parse(
  '[{"addressComponents":["One Central H2B Hotel - Dubai World Trade Centre (DWTC)","Dubai","United Arab Emirates"],"formatedAddress":"One Central H2B Hotel - Dubai World Trade Centre (DWTC) - Dubai - United Arab Emirates","placeId":"ChIJi6EcOMpDXz4RipjsOIQ7iqg","api":"places"},{"addressComponents":["25hours Hotel One Central","Trade Center St","Dubai","United Arab Emirates"],"formatedAddress":"25hours Hotel One Central - Trade Center St - Dubai - United Arab Emirates","placeId":"ChIJJxfJggxDXz4ReLB_0eh9v-U","api":"places"},{"addressComponents":["ibis One Central","Dubai","United Arab Emirates"],"formatedAddress":"ibis One Central - Dubai - United Arab Emirates","placeId":"ChIJw7-GX-tCXz4RWdTxiZzUvCc","api":"places"},{"addressComponents":["The Offices 3, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 3, One Central - Dubai - United Arab Emirates","placeId":"ChIJh722xexCXz4Re50T_HWm-8w","api":"places"},{"addressComponents":["The Offices 4, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 4, One Central - Dubai - United Arab Emirates","placeId":"ChIJQyW8GyxDXz4R4FQsIlMe5PE","api":"places"}]',
);

describe('Address Search Component.js', () => {
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

    it('Check If provided Search Results, its rendering the list', () => {
      const tree = rtlrender(
        <AddressSearchComponent
          searchResult={searchResults}
          onChangeHandler={() => {}}
          inputRef={{ current: { value: '', focus: () => {} } }}
          onFocus={() => {}}
          onSelection={() => {}}
          snapTo={() => {}}
          title="title"
          subTitle="title2"
          inputProps={{
            placeholder: 'Search for...',
          }}
        />,
      );

      expect(tree).toMatchSnapshot();
    });
    it('should display titles in case it is provided', async () => {
      let newid;
      let newapi;

      const tree = rtlrender(
        <AddressSearchComponent
          searchResult={searchResults}
          onChangeHandler={() => {}}
          inputRef={{ current: { value: '', focus: () => {} } }}
          onFocus={() => {}}
          onSelection={({ id, api }) => {
            newid = id;
            newapi = api;
          }}
          snapTo={() => {}}
          inputProps={{
            placeholder: 'Search for...',
          }}
          title="title"
          subTitle="title2"
        />,
      );

      const item = await tree.findByTestId('rendering-searchList');
      fireEvent.click(item.firstChild);

      expect({ id: newid, api: newapi }).toEqual({
        id: 'ChIJi6EcOMpDXz4RipjsOIQ7iqg',
        api: 'places',
      });
    });
  });
});
