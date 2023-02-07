import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';
import { render as rtlRender } from 'react-testing-library';
import * as useScript from '../../../utils/hook/useScript';
import {
  MUST_PROVIDE_GOOGLE_KEY,
  MUST_PROVIDE_MAP_REF,
  MUST_PROVIDE_WOOSMAP_KEY,
} from '../constants';
import MapComponentIndex from '../index';
import { GoogleMapComponent } from '../Map';

class MapMock {
  load = jest.fn().mockImplementation(fn => fn({ map: {} }));
}

describe('Map.js', () => {
  describe('index', () => {
    window.WoosmapLoader = {
      load: jest
        .fn()
        .mockImplementation(options =>
          options.callback ? options.callback() : options(),
        ),
    };

    let container = null;

    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);

    beforeAll(() => {
      jest.mock('../../../utils/hook/useScript', () => jest.fn());
    });
    afterAll(() => React.useEffect.mockRestore());

    beforeEach(() => {
      // setup a DOM element as a render target
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
      const tree = renderer.create(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          googleMapKey={process.env.GOOGLE_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
      );

      expect(tree).toMatchSnapshot();
    });
    it('Should throw if no woos-map key', () => {
      expect(() =>
        renderer.create(
          <MapComponentIndex initalCordinates={[25.204849, 55.270782]} />,
        ),
      ).toThrow(MUST_PROVIDE_WOOSMAP_KEY);
    });

    it('Should throw if google key is not provided to GoogleMapComponent', () => {
      expect(() =>
        renderer.create(
          <GoogleMapComponent woosMapKey={process.env.WOOS_MAP_KEY} />,
        ),
      ).toThrow(MUST_PROVIDE_GOOGLE_KEY);
    });

    it('Should throw if map ref is not provided to GoogleMapComponent', () => {
      expect(() =>
        renderer.create(
          <GoogleMapComponent
            googleMapKey={process.env.GOOGLE_MAP_KEY}
            woosMapKey={process.env.WOOS_MAP_KEY}
          />,
          container,
        ),
      ).toThrow(MUST_PROVIDE_MAP_REF);
    });

    it('WoosMap Should be injected in to the DOM', async () => {
      window.woosmap = {
        MapsLoader: MapMock,
        map: {
          Map: MapMock,
        },
      };
      act(() => {
        render(
          <MapComponentIndex
            woosMapKey={process.env.WOOS_MAP_KEY}
            initalCordinates={[25.204849, 55.270782]}
          />,
          container,
        );
      });

      expect(document.querySelector('body')).toMatchSnapshot();

      act(() => {
        render(
          <MapComponentIndex
            woosMapKey={process.env.WOOS_MAP_KEY}
            initalCordinates={[25.204849, 55.270782]}
          />,
          container,
        );
      });

      expect(document.querySelector('body')).toMatchSnapshot();
    });

    // You cant check if map is rendering the children because map is injecting dynamically and always expecting a marker type component, if it didnt find anything related to marker
    it('Render google map with children', async () => {
      useScript.default = jest.fn().mockImplementation(() => true);

      class Map {}
      window.google = {
        maps: Map,
      };

      window.woosmap = {
        MapsLoader: MapMock,
        map: {
          Map: MapMock,
        },
      };

      const elem = () => <span>Content</span>;

      const tree = rtlRender(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          googleMapKey={process.env.GOOGLE_MAP_KEY}
          cordinates={[25.204849, 55.270782]}
        >
          <elem />
        </MapComponentIndex>,
      );
      tree.rerender(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          googleMapKey={process.env.GOOGLE_MAP_KEY}
          cordinates={[25.204849, 55.270782]}
        >
          <elem />
        </MapComponentIndex>,
      );

      expect(tree.baseElement).toMatchSnapshot();
      expect(tree.container).toMatchSnapshot();
    });

    it('load woosmap component', async () => {
      useScript.default = jest.fn().mockImplementation(() => true);

      window.woosmap = {
        MapsLoader: MapMock,
        map: {
          Map: MapMock,
        },
      };

      render(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      render(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      render(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      render(
        <MapComponentIndex
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      expect(useScript.default).toHaveBeenCalled();
    });

    it('unregister map component on unmounting', async () => {
      useScript.default = jest.fn().mockImplementation(() => true);

      window.woosmap = {
        MapsLoader: MapMock,
        map: {
          Map: MapMock,
        },
      };

      const tree = render(
        <MapComponentIndex
          googleMapKey="testtttt2"
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      render(
        <MapComponentIndex
          googleMapKey="testtttt2"
          woosMapKey={process.env.WOOS_MAP_KEY}
          initalCordinates={[25.204849, 55.270782]}
        />,
        container,
      );

      try {
        tree.unmount();
      } catch (e) {
        console.error(e);
      }

      expect(useScript.default).toHaveBeenCalled();
    });
  });
});
