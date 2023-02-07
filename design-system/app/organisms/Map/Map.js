import React, { useState, useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import useScript from 'utils/hook/useScript';
import { transformedCordinates, uuid } from 'utils/utils';
import {
  MUST_PROVIDE_GOOGLE_KEY,
  MUST_PROVIDE_MAP_REF,
  MUST_PROVIDE_WOOSMAP_KEY,
} from './constants';

const UAE_LAT_LONG = [25.194365, 55.241362];
const ZOOM = 12;
/**
 * List of Events Avaliable on the Map Component
 */
const mapEvents = {
  onBoundsChange: 'bounds_changed',
  onCenterChange: 'center_changed',
  onClick: 'click',
  onDblclick: 'dblclick',
  onDrag: 'drag',
  onDragend: 'dragend',
  onDragstart: 'dragstart',
  onHeadingChange: 'heading_changed',
  onIdle: 'idle',
  onMaptypeidChange: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onRightClick: 'rightclick',
  onZoomChange: 'zoom_changed',
};

const Map = React.forwardRef((props, ref) => {
  // De-structure props
  const {
    children,
    initalCordinates = UAE_LAT_LONG,
    zoom = ZOOM,
    // _ref,
    onCenterChange,
    googleMapKey,
    woosMapKey,
    cordinates,
  } = props;

  // Map Reference from WindowObject
  const [mapWindowRef, setMapWinRef] = useState();
  // Loaded Map Reference
  const [map, setMap] = useState();

  // Map Element Ref
  const mapElement = useRef(null);
  // List of Registered Events
  const activeEvents = useRef({});

  // Switch Map Component between woos-map and google-map
  const MapComponent = googleMapKey ? GoogleMapComponent : WoosMapComponent;

  useEffect(() => {
    if (!mapWindowRef) return undefined;
    const unMount = InitMap();
    return () => {
      unMount();
    };
  }, [mapWindowRef]);

  /**
   * Init the Map.
   * @returns Object : Un-mounter function to unmount  the Map
   */
  const InitMap = () => {
    const LoadedMap =
      mapWindowRef &&
      new mapWindowRef.Map(mapElement.current, {
        center: transformedCordinates(initalCordinates),
        zoom,
        disableDefaultUI: true,
      });

    // eslint-disable-next-line no-param-reassign
    if (ref) ref.current = { map: LoadedMap, mapWindowRef };

    setMap(LoadedMap);

    // Return Unmount Method
    return () => {
      if (mapElement.current) mapElement.current.innerHTML = null;
    };
  };

  useEffect(() => {
    if (!map) return undefined;

    const eventName = Object.keys({ onCenterChange })[0];

    if (!onCenterChange)
      return () => {
        if (activeEvents.current[eventName]) {
          delete activeEvents.current[eventName];
        }
      };

    if (onCenterChange) {
      onCenterChange(undefined, map);
      registerEvent(mapEvents[eventName], onCenterChange);

      return () => {
        if (activeEvents?.current[eventName]) {
          unRegisterEvent(eventName, onCenterChange);
        }
      };
    }

    return null;
  }, [map]);

  /**
   * Register an Event on the Map and save the reference of the event in the events object
   * @param {*} eventName
   * @param {*} callback
   */
  const registerEvent = (eventName, callback) => {
    map.addListener(
      eventName,
      debounce(e => {
        callback(e, map);
      }),

      500,
    );

    activeEvents.current[eventName] = callback;
  };

  /**
   * Un-Register an Event on the Map and remove the reference of the event in the events object
   * @param {*} eventName
   * @param {*} callback
   */
  const unRegisterEvent = (eventName, callback) => {
    if (activeEvents.current[eventName]) {
      delete activeEvents.current[eventName];
    }

    map.removeEventListener(mapEvents[eventName], callback, false);
  };

  useEffect(() => {
    if (!cordinates) return undefined;
    JumpToCordinates();
    return undefined;
  }, [cordinates]);

  // Map Jump to Cordinates
  const JumpToCordinates = () => map?.panTo(transformedCordinates(cordinates));

  const InjectPropsToChildren = _children =>
    React.cloneElement(_children, {
      mapInstance: {
        map,
        mapRef: mapWindowRef,
      },
    });

  const renderChildren = () => {
    // append Map to all the children of the component
    const newChildren = (children?.props?.children || [children]).map(child => {
      const childToMount = child ? InjectPropsToChildren(child) : child;

      return (
        <React.Fragment key={child?.key || uuid()}>
          {childToMount}
        </React.Fragment>
      );
    });

    return newChildren;
  };

  const Markers = useMemo(() => renderChildren(), [map, children]);

  return (
    <MapComponent
      woosMapKey={woosMapKey}
      googleMapKey={googleMapKey}
      mapWindowRef={mapRef => setMapWinRef(mapRef)}
    >
      <div
        ref={mapElement}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {Markers}
      </div>
    </MapComponent>
  );
});

export default Map;

export const MapPropsTypes = {
  cordinates: PropTypes.array,
  initalCordinates: PropTypes.array,
  zoom: PropTypes.number,
  onCenterChange: PropTypes.func,
  googleMapKey: PropTypes.string,
  woosMapKey: PropTypes.string.isRequired,
  children: PropTypes.any,
};

Map.propTypes = {
  cordinates: PropTypes.array,
  initalCordinates: PropTypes.array,
  zoom: PropTypes.number,
  onCenterChange: PropTypes.func,
  googleMapKey: PropTypes.string,
  woosMapKey: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export const GoogleMapComponent = ({
  children,
  googleMapKey,
  mapWindowRef,
}) => {
  if (!googleMapKey) throw new Error(MUST_PROVIDE_GOOGLE_KEY);
  if (!mapWindowRef) throw new Error(MUST_PROVIDE_MAP_REF);

  const [map, setMap] = useState(null);
  const googleMapCDN = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=places`,
  );

  useEffect(() => {
    if (!googleMapCDN) return undefined;
    setMap(window.google.maps);
    return () => null;
  }, [googleMapCDN]);

  useEffect(() => {
    if (map && mapWindowRef) {
      mapWindowRef(map);
    }
  }, [map]);
  return <>{children}</>;
};

GoogleMapComponent.propTypes = {
  googleMapKey: PropTypes.string.isRequired,
  children: PropTypes.any,
  mapWindowRef: PropTypes.func,
};

export const WoosMapComponent = ({ children, woosMapKey, mapWindowRef }) => {
  if (!woosMapKey) throw new Error(MUST_PROVIDE_WOOSMAP_KEY);
  if (!mapWindowRef) throw new Error(MUST_PROVIDE_MAP_REF);

  const mapLoaded = useScript(
    `https://sdk.woosmap.com/map/map.js?key=${woosMapKey}&callback=initMap`,
  );

  useEffect(() => {
    if (!mapLoaded) return undefined;
    mapWindowRef(window.woosmap.map);
    return undefined;
  }, [mapLoaded]);

  if (!mapLoaded) return <>Loading ...</>;
  return children;
};
WoosMapComponent.propTypes = {
  woosMapKey: PropTypes.string.isRequired,
  children: PropTypes.any,
  mapWindowRef: PropTypes.func,
};
