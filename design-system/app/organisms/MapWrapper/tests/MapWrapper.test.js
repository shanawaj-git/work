import React, { useRef } from 'react';
import renderer from 'react-test-renderer';
import { wait, render as reactTestingRender } from 'react-testing-library';
import { unmountComponentAtNode } from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import MapWrapperComponent from '..';
import Map from '../../Map/Map';

configure({ adapter: new Adapter() });

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();

  return {
    ...originReact,
    useRef: mUseRef,
    useEffect: jest.fn(),
  };
});

describe('Map.js', () => {
  let container = null;
  window.MutationObserver = require('@sheerun/mutationobserver-shim');
  describe('index', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);

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
      //   jest.spyOn(React, 'useEffect').mockImplementationOnce(cb => cb());
      //   jest.mock('utils/hook/useScript', () => ({
      //     useScript: jest.fn(),
      //   }));
      // setup a DOM element as a render target
      container = document.createElement('div');
      document.body.appendChild(container);
    });
    afterAll(() => React.useEffect.mockRestore());

    afterEach(() => {
      // cleanup on exiting
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it('Should import succesfully', () => {
      useRef.mockReturnValue({ current: undefined });

      const tree = renderer.create(
        <MapWrapperComponent
          initalCordinates={[25.204849, 55.270782]}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          googleMapKey={process.env.GOOGLE_MAP_KEY}
          onMapDrag={jest.fn()}
          title="title"
          subTitle="title2"
        />,
      );
      expect(tree).toBeTruthy();
    });

    // The purpose of this test is to test Drag Callback, in which response, we are testing that
    // bottomsheet is provided with mapDragAddress.
    it('On Center Change, should update the mapDragAddress Provided to BottomSheet component', async () => {
      jest.mock('utils/utils', () => ({
        debounce: fn => fn(),
      }));

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve(
              JSON.parse(
                '{"results":[{"formatted_address":"20 Street, Al Wasl Dubai, United Arab Emirates","types":["route"],"address_components":[{"types":["country"],"long_name":"United Arab Emirates","short_name":"ARE"},{"types":["county"],"long_name":"Dubai","short_name":"Dubai"},{"long_name":"Dubai","short_name":"Dubai","types":["locality"]},{"long_name":"Al Wasl","short_name":"Al Wasl","types":["district"]},{"long_name":"20 Street","short_name":"20 Street","types":["route"]}],"geometry":{"location_type":"GEOMETRIC_CENTER","location":{"lat":25.20538,"lng":55.25795},"viewport":{"northeast":{"lat":25.20993,"lng":55.26111},"southwest":{"lat":25.20361,"lng":55.2568}}},"distance":94}],"status":"OK"}',
              ),
            ),
        }),
      );

      window.WoosmapLoader = {
        load: jest.fn(),
      };

      const wrapper = shallow(
        <MapWrapperComponent
          initalCordinates={[25.204849, 55.270782]}
          woosMapKey={process.env.WOOS_MAP_KEY}
          googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
          googleMapKey={process.env.GOOGLE_MAP_KEY}
          onMapDrag={jest.fn()}
          title="title"
          subTitle="title2"
        />,
      );

      await wrapper
        .find(Map)
        .props()
        .onCenterChange('', {
          getCenter: jest.fn().mockReturnValue({
            lat: () => 25.204849,
            lng: () => 55.270782,
          }),
        });

      // wait for the promise to resolve
      await wait(() => {
        expect(wrapper.props().children[1].props.mapDragAddress).toBeTruthy();
      });
    });

    // This functions test that if onSelection is triggered, the reaction of that onSelection should
    // be the trigger of map PanTo function, which indicates that locaiton has been changes.
    it('Should Call Map PanTo to Move The Map', async () => {
      jest.mock('utils/utils', () => ({
        debounce: fn => fn(),
      }));
      jest.mock('react', () => ({
        useEffect: fn => fn(),
      }));

      const mapREf = {
        current: {
          map: {
            panTo: jest.fn(),
            addListener: jest.fn(),
          },
        },
      };
      useRef.mockReturnValueOnce(mapREf);
      useRef.mockReturnValueOnce({ current: undefined });
      useRef.mockReturnValueOnce({ current: undefined });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve(
              JSON.parse(
                '{"results":[{"formatted_address":"20 Street, Al Wasl Dubai, United Arab Emirates","types":["route"],"address_components":[{"types":["country"],"long_name":"United Arab Emirates","short_name":"ARE"},{"types":["county"],"long_name":"Dubai","short_name":"Dubai"},{"long_name":"Dubai","short_name":"Dubai","types":["locality"]},{"long_name":"Al Wasl","short_name":"Al Wasl","types":["district"]},{"long_name":"20 Street","short_name":"20 Street","types":["route"]}],"geometry":{"location_type":"GEOMETRIC_CENTER","location":{"lat":25.20538,"lng":55.25795},"viewport":{"northeast":{"lat":25.20993,"lng":55.26111},"southwest":{"lat":25.20361,"lng":55.2568}}},"distance":94}],"status":"OK"}',
              ),
            ),
        }),
      );

      window.WoosmapLoader = {
        load: jest.fn(),
      };

      try {
        const tree = reactTestingRender(
          <MapWrapperComponent
            initalCordinates={[25.204849, 55.270782]}
            woosMapKey={process.env.WOOS_MAP_KEY}
            googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
            googleMapKey={process.env.GOOGLE_MAP_KEY}
            onMapDrag={jest.fn()}
            title="title"
            subTitle="title2"
            ref={{ current: {} }}
          />,
        );

        tree.rerender(
          <MapWrapperComponent
            initalCordinates={[25.204849, 55.270782]}
            woosMapKey={process.env.WOOS_MAP_KEY}
            googlePlacesKey={process.env.GOOGLE_PLACES_KEY}
            googleMapKey={process.env.GOOGLE_MAP_KEY}
            onMapDrag={jest.fn()}
            title="title"
            subTitle="title2"
            ref={{ current: {} }}
          />,
        );

        expect(tree).toMatchSnapshot();
      } catch (e) {
        console.error(e);
      }
    });
  });
});
