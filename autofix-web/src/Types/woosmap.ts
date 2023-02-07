export interface windowMultiSearch {
  woosmap: {
    multisearch: (e: woosmapMutliSearchPayloadType) => multiSearchType;
  };
}

export interface processAutoCompleteType {
  addressComponents?: string[];
  label?: string;
  id: string;
  api: string;
}

export interface getPlaceDetailsType {
  id: string;
  api: string;
}

export interface multiSearchType {
  autocompleteMulti: (
    e: string
  ) => Promise<autocompleteMultiResponse[] | string>;
  detailsMulti: (obj: getPlaceDetailsType) => Promise<detailsMultiType>;
}

export interface autocompleteMultiResponse {
  id: string;
  api: string;
  item: autocompleteMultiResponseItem;
  description: string;
  highlight: string;
  score: number | string;
  types: string[];
}

interface autocompleteMultiResponseItem {
  terms: autocompleteMultiResponseItemTerms[];
  description: string;
}

interface autocompleteMultiResponseItemTerms {
  value: string;
}

export interface woosmapMutliSearchPayloadType {
  apiOrder?: string[];
  localities?: Localities;
  address?: addressType;
  places?: placesType;
  components?: componentType;
}

export interface paramsTypes {
  language: string;
  components: componentType;
}

export interface componentType {
  country: string[];
}
export interface Localities {
  key: string;
  params: paramsTypes;
}

export interface addressType {
  key: string;
  params: paramsTypes;
}

export interface placesType {
  params: paramsTypes;
  key: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface geometryType {
  location: Location;
}

export interface addressComponentType {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface itemType {
  address_components: addressComponentType[];
  adr_address: string;
  formatted_address: string;
  geometry: geometryType;
  icon: string;
  name: string;
  place_id: string;
  types: string[];
  url: string;
  vicinity: string;
  html_attributions?: unknown;
}

export interface detailsMultiType {
  formatted_address?: string;
  geometry: geometryType;
  name?: string;
  api?: string;
  types?: string[];
  id?: string;
  address_components?: addressComponentType[];
  item?: itemType;
}
