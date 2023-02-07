import { itemType } from "@/containers/RecommendedMaintenance";
import {
  AssetType,
  fetchCommonData,
  FooterType,
  getAssets,
  getAssetsData,
  getLabelData,
  getLabels,
  HomeActionType,
  LabelType,
  ServiceType,
} from "@/services/common";
import { TestimonialType } from "@/services/home/testimonial";

export const utils = "UTILS";
const GRAPHQL_CLIENT_READ_TIMEOUT = 5000;

interface getCommonPageContentParams {
  locale: I18NLocale;
  pageName: string;
}

export interface HomeContentType {
  labels?: LabelType[];
  assets?: AssetType[];
  services?: ServiceType[];
  actions?: HomeActionType[];
  testimonials?: TestimonialType[];
  footer?: FooterType;
}

export type I18NLocale = "en" | "ar";

/**
 * Will Return a Data object with Labels and Assets Regarding the page from Strapi
 * @param  locale , pageName
 * @returns Object with Labels and Assets
 */

export const getCommonPageContent = async ({
  locale,
  pageName,
}: getCommonPageContentParams): Promise<HomeContentType> => {
  let data: HomeContentType = {};
  return new Promise(async (resolve, reject) => {
    try {
      const commonData = await (
        await fetchCommonData(locale as I18NLocale, pageName)
      ).data;
      const assets = getAssets(commonData);
      const assetsData = getAssetsData(assets);
      const labels = getLabelData(getLabels(commonData));
      data = { assets: assetsData, labels };
      resolve(data);
    } catch (error) {
      resolve(data);
    }
  });
};

interface rejectEarlyType<T> {
  fn: () => Promise<T>;
  def: T;
  timeout?: number;
}

export const rejectEarly = <T>({
  fn,
  def,
  timeout = GRAPHQL_CLIENT_READ_TIMEOUT,
}: rejectEarlyType<T>): Promise<T> => {
  return new Promise(async (resolve, _reject) => {
    setTimeout(() => {
      resolve(def);
    }, timeout);
    try {
      const out: T = await fn();
      resolve(out);
    } catch (error) {
      resolve(def);
    }
  });
};

export const validateEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const flatData = (obj: { [key: string]: {} }) =>
  Object.values(obj).reduce((acc: {}, curr: {}) => {
    return { ...acc, ...curr };
  }, {});

export const buildImageUrl = (path: string): string =>
  process.env.NEXT_PUBLIC_STRAPI_SERVICE?.concat(path) || "";

export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });

export const includesCaseInsensitive = (
  string: string,
  substring: string
): Boolean => {
  return string.toLowerCase().includes(substring.toLowerCase());
};
export const getTotalForMax = (data: itemType[]) => {
  return data.reduce((acc: number, curr: { cost: string }) => {
    let value = acc;
    value += +parseFloat(
      (curr.cost.match(/[0-9]+/gm) || ["0"]).splice(-1)[0]
    ).toFixed(2);
    return value;
  }, 0);
};

export const getCurrency = (data: itemType[]) => {
  return (data[0].cost.match(/[A-Z]+/gm) || ["USD"]).splice(-1)[0];
};

export const getCurrentLocation = () => {
  return new Promise((resolve: (e: GeolocationCoordinates) => void, reject) => {
    if (!navigator) throw new Error("Navigator doesn't exist");
    if (!navigator.geolocation) throw new Error("Geolocation doesn't exist");
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        return resolve(position.coords);
      },
      reject,
      {
        maximumAge: 5000,
        enableHighAccuracy: true,
      }
    );
  });
};

interface getCurrentLiveLocationType {
  callBack: (e: GeolocationPosition) => void;
  onError: (e: GeolocationPositionError | Error) => void;
}

export const getCurrentLiveLocation = ({
  callBack,
  onError,
}: getCurrentLiveLocationType) => {
  if (!navigator) throw new Error("Navigator doesn't exist ");
  if (!navigator.geolocation) throw new Error("Geolocation doesn't exist ");
  navigator.geolocation.watchPosition((position: GeolocationPosition) => {
    callBack(position);
  }, onError);
};
