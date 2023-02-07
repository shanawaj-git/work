import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import * as utils from 'utils/utils';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';
import MarkerComponent, { UAE_LAT_LONG } from '../Marker';

jest.mock('@googlemaps/markerwithlabel');

const shallowRenderer = new ShallowRenderer();

describe('Marker.js', () => {
  utils.uuid = jest.fn().mockReturnValue('testId');

  beforeAll(() => {
    MarkerWithLabel.mockImplementation(() => ({
      isTouchScreen: false,
      isDraggingLabel: false,
      isMouseDownOnLabel: false,
      shouldIgnoreClick: false,
      label: {
        labelDiv: {},
        eventDiv: {},
        anchor: {
          x: 0,
          y: 0,
        },
        clickable: true,
        hoverCursor: 'pointer',
        draggable: true,
        position: {
          lat: 0,
          lng: 0,
        },
        zIndex: 0,
        zIndexOffset: 1,
      },
      propertyListeners: [],
      setPosition: jest.fn(),
      getCenter: () => true,
      setMap: jest.fn(),
      getMap: jest.fn(),
    }));
  });

  afterEach(() => {
    MarkerWithLabel.mockClear();
  });

  const mapInstance = {
    id: 10,
    mapRef: {
      LatLng: jest.fn(),
      Point: jest.fn(),
    },
    map: {
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
      }),
      getCenter: jest.fn(),
    },
  };
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(
        <MarkerComponent
          Map={{ mapRef: {} }}
          initalCordinates={[25.194365, 55.241362]}
        />,
      );
      expect(tree).toBeTruthy();
    });

    // Check if the maker is completely rendered and visible
    it('Should render the marker', async () => {
      shallowRenderer.render(
        <MarkerComponent
          id="Marker"
          initalCordinates={[25.204849, 55.270782]}
        />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });

    it('test marker full lifecycle', () => {
      const tree = renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          initalCordinates={[25.194365, 55.241362]}
        />,
      );

      expect(tree.root.findByType(MarkerComponent)).toMatchSnapshot();

      const tree2 = renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          initalCordinates={[25.194365, 55.241362]}
          center
          ref={jest.fn()}
        />,
      );
      expect(tree2.root.findByType(MarkerComponent)).toMatchSnapshot();

      mapInstance.id = 20;
      const tree3 = renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          initalCordinates={[25.194365, 55.241362]}
          center
          _ref={jest.fn()}
        />,
      );

      // unmounting the component

      tree.unmount();

      expect(tree3.root.findByType(MarkerComponent)).toMatchSnapshot();
    });

    it('Should call MarkerWithLabel with given properties', () => {
      const markerProps = {
        labelContent: 'Here',
        labelClass: 'labels',
        labelStyle: { opacity: 0.75 },
        initialCoordinates: [32.322, 50.421],
      };
      renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          labelContent={markerProps.labelContent}
          labelStyle={markerProps.labelStyle}
          initalCordinates={markerProps.initialCoordinates}
          labelClass={markerProps.labelClass}
        />,
      );

      renderer.create(
        <MarkerComponent mapInstance={mapInstance} labelContent="Here" />,
      );

      const instanceCreationParameters = MarkerWithLabel.mock.calls[0][0];
      expect(instanceCreationParameters.labelContent).toBe(
        markerProps.labelContent,
      );
      expect(instanceCreationParameters.labelStyle).toBe(
        markerProps.labelStyle,
      );
      expect(instanceCreationParameters.labelClass).toBe(
        markerProps.labelClass,
      );
      expect(mapInstance.mapRef.LatLng).toHaveBeenCalledWith(
        markerProps.initialCoordinates[0],
        markerProps.initialCoordinates[1],
      );
    });

    it('Should call MarkerWithLabel with given labelAnchorCoordinates coordinates', async () => {
      renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          labelAnchorCoordinates={[32.322, 50.421]}
        />,
      );

      renderer.create(
        <MarkerComponent
          mapInstance={mapInstance}
          labelAnchorCoordinates={[32.322, 50.421]}
        />,
      );

      expect(mapInstance.mapRef.Point).toHaveBeenCalledWith(32.322, 50.421);
    });

    it('Should use fallback coordinates when no initial coordinates', async () => {
      renderer.create(<MarkerComponent mapInstance={mapInstance} />);

      renderer.create(<MarkerComponent mapInstance={mapInstance} />);

      expect(mapInstance.mapRef.LatLng).toHaveBeenCalledWith(
        UAE_LAT_LONG[0],
        UAE_LAT_LONG[1],
      );
    });

    it('Pass map ref prop with _ref prop', () => {
      const tree = renderer.create(
        <MarkerComponent
          Map={{ mapRef: {} }}
          initalCordinates={[25.194365, 55.241362]}
          _ref
        />,
      );

      renderer.create(
        <MarkerComponent
          Map={{ mapRef: {} }}
          initalCordinates={[25.194365, 55.241362]}
          _ref
        />,
      );

      expect(tree.root.findByType(MarkerComponent)).toMatchSnapshot();
    });
  });
});
