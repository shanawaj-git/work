import React, { useCallback, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { debounce, readableCordinates } from 'utils/utils';
import Map from '../Map';
import Marker from '../../atoms/Marker/Marker';
import AddressBottomSheetComponent from '../AddressBottomSheet';

const [LAT, LNG] = [25.204849, 55.270782];
const REVERSE_GEOCODE_URL = 'https://api.woosmap.com/address/geocode/json?';
const MAP_DRAG_DEBOUNCE_TIME = 1000;
const MAP_CLICK_DEBOUNCE_TIME = 500;

const MapWrapper = React.forwardRef((props, ref) => {
  const {
    woosMapKey,
    googleMapKey,
    googlePlacesKey,
    markerProps: markerPropsByParent,
    mapProps: _mapProps,
    onCancel,
    onSave,
    onMapDrag,
    title,
    subTitle,
  } = props;

  const [mapDragAddress, setmapDragAddress] = useState(undefined);
  const [isLoading, setLoading] = useState({
    mapForm: false,
  });

  const mapRef = useRef();
  const bottomSheetRef = useRef();
  const markerPositionRef = useRef();

  /**
   * On Center-Change Event of the Map Component
   */
  const onCenterChange = debounce(async (center, map) => {
    if (onMapDrag) onMapDrag(map);
    if (markerPositionRef.current)
      return (() => {
        markerPositionRef.current = false;
      })();
    const newCordinates = readableCordinates(map.getCenter());
    const res = await reverseGeoCode([newCordinates.lat, newCordinates.lng]);
    if (Array.isArray(res.results)) setmapDragAddress(res.results[0]);

    return undefined;
  }, MAP_DRAG_DEBOUNCE_TIME);

  /**
   * Event For On Multi-Search List Item Click
   * @param {*} Object : Lat,Lng
   * @param {*} multiSearchInstance : WoosMapMultiSearch instance
   */
  const onPlaceSelected = useCallback(async payload => {
    const { lat, lng } = payload;
    markerPositionRef.current = true;
    mapRef.current.map.panTo({ lat, lng });
  }, []);

  /**
   * Provided Lat,Lng, this will reverse geoCode and return the Places Detail
   * @param {*} latLng
   */
  const reverseGeoCode = async latLng => {
    handleLoading({ key: 'mapForm', value: true });
    const url = getReverseGeocodeURL({ latLng, woosMapKey });
    const response = await fetch(url);
    const res = await response.json();
    handleLoading({ key: 'mapForm', value: false });
    return res;
  };

  /**
   * When the Bottom Sheet is expended, this handle the functionality to minimze the Bottom Sheet on click of the map
   */
  useEffect(() => {
    if (!mapRef?.current) return undefined;
    const { map } = mapRef.current;
    if (!map) return undefined;
    const EVENT = 'click';
    map.addListener(
      EVENT,
      debounce(() => {
        bottomSheetRef.current.snapTo(({ snapPoints }) => snapPoints[0]);
      }),
      MAP_CLICK_DEBOUNCE_TIME,
    );
    return undefined;
  }, [mapRef?.current]);

  const handleLoading = ({ key, value }) => {
    setLoading({
      ...isLoading,
      [key]: value,
    });
  };
  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = {
        mapRef,
        bottomSheetRef,
      };
    }
  }, [ref]);

  const bottomSheetEvents = {};
  if (onCancel) bottomSheetEvents.onCancel = onCancel;
  if (onSave) bottomSheetEvents.onConfirmLocation = onSave;

  const MapProps = {
    woosMapKey,
    googleMapKey,
    onCenterChange,
    ..._mapProps,
    ref: mapRef,
  };

  const MarkerProps = {
    initalCordinates: [LAT, LNG],
    center: true,
    ...markerPropsByParent,
  };

  const BottomSheetProps = {
    title,
    subTitle,
    loading: isLoading.mapForm,
    mapDragAddress,
    ref: bottomSheetRef,
    onSelection: onPlaceSelected,
    woosMapKey,
    googlePlacesKey,
    ...bottomSheetEvents,
  };

  return (
    <Container>
      <div className="h-full pb-20">
        <Map {...MapProps}>
          <Marker {...MarkerProps} />
        </Map>
      </div>
      <AddressBottomSheetComponent {...BottomSheetProps} />
    </Container>
  );
});

const Container = ({ children }) => (
  <div style={{ height: '100vh', width: '100vw' }}>{children}</div>
);

const getReverseGeocodeURL = ({ latLng, woosMapKey }) =>
  `${REVERSE_GEOCODE_URL}latlng=${latLng.join(',')}&key=${woosMapKey}`;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

MapWrapper.defaultProps = {
  markerProps: {},
  mapProps: {},
};

MapWrapper.propTypes = {
  googlePlacesKey: PropTypes.string.isRequired,
  googleMapKey: PropTypes.string,
  woosMapKey: PropTypes.string.isRequired,
  children: PropTypes.any,
  markerProps: PropTypes.any,
  mapProps: PropTypes.any,
  bottomSheetProps: PropTypes.any,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onMapDrag: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default MapWrapper;
