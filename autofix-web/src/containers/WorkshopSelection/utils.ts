import {
  BoundPayloadType,
  GetDirections,
  LatLngType,
  MapObjType,
} from "./interfaces";

export const markerIcon = (icon: string) => ({
  scaledSize: {
    height: 24,
    width: 24,
  },
  url: icon,
});

export const getBoundLocation = ({
  map,
  onBoundChange,
}: {
  map: MapObjType;
  onBoundChange: (e: BoundPayloadType) => void;
}) => {
  const bounds = map.getBounds();
  const southWest = getSouthWestCoordinates(bounds);
  const northEast = getNorthEastCoordinates(bounds);
  const result = buildBoundPayload(northEast, southWest);
  onBoundChange(result);
};

const getSouthWestCoordinates = (bounds: GetDirections): LatLngType => ({
  lat: bounds.getSouthWest().lat(),
  lng: bounds.getSouthWest().lng(),
});

const getNorthEastCoordinates = (bounds: GetDirections): LatLngType => ({
  lat: bounds.getNorthEast().lat(),
  lng: bounds.getNorthEast().lng(),
});

const buildBoundPayload = (
  northEast: LatLngType,
  southWest: LatLngType
): BoundPayloadType => ({
  locationBoxBounds: {
    bottomLeft: {
      type: "Point",
      coordinates: [southWest.lng, southWest.lat],
    },
    topRight: { type: "Point", coordinates: [northEast.lng, northEast.lat] },
  },
});
