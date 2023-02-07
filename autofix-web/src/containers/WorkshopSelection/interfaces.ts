import { LabelType } from "@/services/common";
import { Location } from "@/Types/woosmap";

export interface WorkshopSelectionType {
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

export interface LatLng {
  lat: () => number;
  lng: () => number;
}

export interface workshopType {
  id: string;
  name: string;
  rating: number;
  address: {
    location: {
      coordinates: number[];
    };
  };
}

export interface GetDirections {
  getNorthEast: () => LatLng;
  getSouthWest: () => LatLng;
}

export interface MapObjType {
  getBounds: () => GetDirections;
  getZoom: () => number;
  panTo: (e: LatLngType) => void;
  addListener(arg0: string, arg1: () => void): unknown;
}

export interface MapType {
  map: MapObjType;
  mapWindowRef: {};
}
export interface LatLngType {
  lat: number;
  lng: number;
}

export interface LocationType {
  type: string;
  coordinates: number[];
}

export interface BoundPayloadType {
  locationBoxBounds: {
    bottomLeft: LocationType;
    topRight: LocationType;
  };
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface WorkshopsPayload {
  payload: {
    locationBoxBounds: {
      bottomLeft: GeoLocation;
      topRight: GeoLocation;
    };
    limit: number;
  };
}

export interface HeaderChildrenProps {
  searchText: string;
  setSearchText: Function;
  onAddressSelection: (location: Location) => void;
}

export interface WorkshopMarkerProps {
  name: string;
  rating: number;
}
