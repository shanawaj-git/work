import {
  autocompleteMultiResponse,
  detailsMultiType,
  getPlaceDetailsType,
  multiSearchType,
  processAutoCompleteType,
  windowMultiSearch,
} from "src/Types/woosmap";

export const MULTI_SEARCH_CDN =
  "https://sdk.woosmap.com/multisearch/multisearch.js?version=6";
const UAE_COUNTRY_CODE = "AE";
const components = {
  country: [UAE_COUNTRY_CODE],
};

// Get the detailed
export const getPlaceDetails = (
  detailsMulti: (e: getPlaceDetailsType) => Promise<detailsMultiType>,
  obj: getPlaceDetailsType
) => detailsMulti(obj);

// Search By Text
export const getPlacesByName = (
  multiSearch: Function,
  value: string
): Promise<autocompleteMultiResponse[]> => multiSearch(value);

export const processAutoComplete = (
  searchResults: autocompleteMultiResponse[]
): processAutoCompleteType[] =>
  searchResults.map((searchResultItem) => {
    const { id, api } = searchResultItem;
    const { terms = [], description } = searchResultItem?.item;
    return {
      addressComponents: terms.map((term) => term.value),
      label: description,
      id: id,
      api,
    };
  });

export const getWoosMap = () =>
  (window as unknown as windowMultiSearch).woosmap;

export const initMultiSearchAPI = (): multiSearchType =>
  getWoosMap().multisearch({
    apiOrder: ["places", "localities", "address"],
    components,
    localities: {
      key: `${process.env.NEXT_PUBLIC_WOOS_MAP_KEY}`,
      params: {
        language: "en",
        components,
      },
    },
    address: {
      key: `${process.env.NEXT_PUBLIC_WOOS_MAP_KEY}`,
      params: {
        language: "en",
        components,
      },
    },
    places: {
      params: {
        language: "en",
        components,
      },
      key: `${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`,
    },
  });
