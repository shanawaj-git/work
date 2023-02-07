import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DEFAULT_MARKER_ICON from 'images/marker-icon.svg';
import { uuid } from 'utils/utils';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';
export const UAE_LAT_LONG = [25.194365, 55.241362];

const FALLBACK_ICON = {
  url: DEFAULT_MARKER_ICON,
  scaledSize: {
    height: 30,
    width: 30,
  },
};
const Marker = props => {
  const {
    mapInstance,
    initalCordinates = UAE_LAT_LONG,
    icon = FALLBACK_ICON,
    id = uuid(),
    _ref,
    center,
    labelContent = '',
    labelAnchorCoordinates = UAE_LAT_LONG,
    labelZIndexOffset,
    labelClass,
    labelStyle = '',
    clickable = true,
    draggable = false,
  } = props;

  const markerInstance = useRef();

  useEffect(() => {
    if (!mapInstance?.mapRef) return undefined;
    const unMount = mountMarker();
    return () => unMount();
  }, [mapInstance]);

  useEffect(() => {
    if (!center || !markerInstance?.current) return undefined;

    mapInstance.map.addListener('center_changed', () => {
      markerInstance.current.setPosition(mapInstance.map.getCenter());
    });

    return undefined;
  }, [center]);

  // Mounting Marker
  const mountMarker = () => {
    const customMarker = new MarkerWithLabel({
      position: center
        ? mapInstance?.map.getCenter()
        : new mapInstance.mapRef.LatLng(
            initalCordinates[0],
            initalCordinates[1],
          ),
      icon,
      clickable,
      draggable,
      map: mapInstance.map,
      labelContent,
      labelAnchor: new mapInstance.mapRef.Point(
        labelAnchorCoordinates[0],
        labelAnchorCoordinates[1],
      ),
      labelClass,
      labelStyle,
      labelZIndexOffset,
    });
    customMarker.setMap(mapInstance.map);
    customMarker.id = id;
    markerInstance.current = customMarker;
    if (_ref) _ref(customMarker);

    // Return Un-Mounting
    return () => {
      markerInstance.current.setMap(null);
      return undefined;
    };
  };

  return <></>;
};

export default Marker;

const IconProp = PropTypes.shape({
  url: PropTypes.string,
  scaledSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
});

Marker.propTypes = {
  labelContent: PropTypes.string,
  labelZIndexOffset: PropTypes.number,
  labelClass: PropTypes.string,
  clickable: PropTypes.bool,
  draggable: PropTypes.bool,
  mapInstance: PropTypes.any,
  labelAnchorCoordinates: PropTypes.array,
  labelStyle: PropTypes.object,
  initalCordinates: PropTypes.array,
  center: PropTypes.bool,
  icon: IconProp,
  id: PropTypes.string,
  _ref: PropTypes.func,
};
