import React from 'react';
import { fireEvent, render as rtlrender } from 'react-testing-library';
import { render, unmountComponentAtNode } from 'react-dom';
import AddressBottomSheetComponent from '..';
import * as useScript from 'utils/hook/useScript';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { AddressSearchComponent } from '../AddressSearchComponent';
import * as hooks from '../hooks';

configure({ adapter: new Adapter() });

describe('BottomSheet.js', () => {
  let container = null;
  const titles = {
    title: 'Where would you like',
    subTitle: 'your meds delivered to?',
  };
  describe('index', () => {
    window.MutationObserver = require('@sheerun/mutationobserver-shim');
    beforeAll(() => {
      jest.mock('utils/utils', () => ({
        debounce: fn => fn(),
        useScript: () => jest.fn(),
      }));
    });

    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      // cleanup on exiting
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it('Should import succesfully', () => {
      render(
        <AddressBottomSheetComponent
          {...titles}
          loading={false}
          ref={{
            current: {
              snapTo: jest.fn(),
            },
          }}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
        />,
        container,
      );
      expect(container).toMatchSnapshot();
    });
    it('Should Render thee correct Component', async () => {
      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          ref={{
            current: {
              snapTo: jest.fn(),
            },
          }}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
        />,
        container,
      );
      tree.rerender(
        <AddressBottomSheetComponent
          {...titles}
          ref={{
            current: {
              snapTo: jest.fn(),
            },
          }}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
        />,
        container,
      );

      expect(tree.findAllByText('Where would you like')).toBeTruthy();
    });

    it('Should throw if no Google Places Id is given ', () => {
      expect(() =>
        render(
          <AddressBottomSheetComponent
            {...titles}
            ref={{
              current: {
                snapTo: jest.fn(),
              },
            }}
            woosMapKey={process.env.WOOS_MAP_KEY}
          />,
          container,
        ),
      ).toThrow('Google Places ID is Required');
    });

    it('Should throw if no Woos Map key is given ', () => {
      expect(() =>
        render(
          <AddressBottomSheetComponent
            {...titles}
            // woosMapKey={process.env.WOOS_MAP_KEY}
            googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          />,
          container,
        ),
      ).toThrow('Woos Map ID is Required');
    });

    it('Should render Search Input', async () => {
      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
        />,
      );
      // Simulate input

      const input = tree.getByTestId('search-input');
      expect(input).toBeTruthy();
    });
    it('Should render Form Component provided MapDragAddress', async () => {
      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          mapDragAddress={JSON.parse(
            '{"addressComponents":["The Offices 4, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 4, One Central - Dubai - United Arab Emirates","placeId":"ChIJQyW8GyxDXz4R4FQsIlMe5PE","api":"places"}',
          )}
          ref={{ current: { snapTo: jest.fn() } }}
        />,
      );
      const form = tree.getByTestId('rendering-form');
      expect(form).toBeTruthy();
    });

    it('Back Button Should be Functional', async () => {
      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          mapDragAddress={JSON.parse(
            '{"addressComponents":["The Offices 4, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 4, One Central - Dubai - United Arab Emirates","placeId":"ChIJQyW8GyxDXz4R4FQsIlMe5PE","api":"places"}',
          )}
          ref={{ current: { snapTo: jest.fn() } }}
        />,
      );
      const btn = await tree.findByTestId('render-cancel');

      fireEvent.click(btn);

      const search = await tree.findByTestId('rendering-search');
      expect(search).toBeTruthy();
    });

    it('Should change the value of the input in case of editing', async () => {
      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          ref={{ current: { snapTo: jest.fn() } }}
        />,
      );

      const input = await tree.findByTestId('search-input');
      const newValue = 'update field';
      fireEvent.change(input, { target: { value: `${newValue}` } });
      expect(input.value).toEqual(`${newValue}`);
    });

    it('Should render Loading State provided Loading is true', async () => {
      const wrapper = shallow(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          mapDragAddress={JSON.parse(
            '{"addressComponents":["The Offices 4, One Central","Dubai","United Arab Emirates"],"formatedAddress":"The Offices 4, One Central - Dubai - United Arab Emirates","placeId":"ChIJQyW8GyxDXz4R4FQsIlMe5PE","api":"places"}',
          )}
          loading
        />,
      );

      // mocking snapTo point
      await wrapper
        .find(BottomSheet)
        .props()
        .snapPoints({ maxHeight: 300 });
      expect(wrapper).toMatchSnapshot();
    });

    it('Should hide search compnent and show address component on address card selection', async () => {
      const searchResult = [
        {
          id: '',
          api: '',
          item: {
            terms: [{ value: 'this is a term' }],
            description: '',
          },
          addressComponents: ['test address'],
        },
      ];

      useScript.default = jest.fn().mockImplementation(() => true);

      window.woosmap = {
        multisearch: jest.fn().mockImplementation(() => ({
          detailsMulti: jest.fn().mockImplementation(() => ({
            geometry: {
              location: '25.23, 26.231',
            },
          })),
        })),
      };
      hooks.useOnInputChange = jest
        .fn()
        .mockImplementation(
          ({ setSearchResult, processSearchResult }) => () => {
            if (setSearchResult) setSearchResult(searchResult);
            if (processSearchResult) processSearchResult(searchResult);
          },
        );

      const onSelection = jest.fn();

      const tree = rtlrender(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          ref={{ current: { snapTo: jest.fn() } }}
          onSelection={onSelection}
        />,
      );

      const input = await tree.findByTestId('search-input');
      const newValue = 'update field';
      fireEvent.change(input, { target: { value: `${newValue}` } });
      expect(input.value).toEqual(`${newValue}`);

      const addressCard = document.querySelector(
        '[data-testid=rendering-searchList] :first-child',
      );

      // simulate click on address card
      fireEvent.click(addressCard);

      const confirmButton = await tree.findByTestId('render-confirm');
      expect(confirmButton).not.toEqual(null);
      expect(onSelection).toHaveBeenCalled();
    });

    it('Should move the bottom sheet up when focusing on the input', async () => {
      const searchResult = [
        {
          id: '',
          api: '',
          item: {
            terms: [{ value: 'this is a term' }],
            description: '',
          },
          addressComponents: ['test address'],
        },
      ];

      useScript.default = jest.fn().mockImplementation(() => true);

      window.woosmap = {
        multisearch: jest.fn().mockImplementation(() => ({
          detailsMulti: jest.fn().mockImplementation(() => ({
            geometry: {
              location: '25.23, 26.231',
            },
          })),
        })),
      };
      hooks.useOnInputChange = jest
        .fn()
        .mockImplementation(
          ({ setSearchResult, processSearchResult }) => () => {
            if (setSearchResult) setSearchResult(searchResult);
            if (processSearchResult) processSearchResult(searchResult);
          },
        );

      const onSelection = jest.fn();

      const wrapper = shallow(
        <AddressBottomSheetComponent
          {...titles}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          ref={{ current: { snapTo: jest.fn() } }}
          onSelection={onSelection}
        />,
      );

      await wrapper
        .find(AddressSearchComponent)
        .props()
        .onFocus();

      await wrapper
        .find(BottomSheet)
        .props()
        .snapPoints({ maxHeight: 300 });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
