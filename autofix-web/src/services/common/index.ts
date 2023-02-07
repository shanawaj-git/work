import { GET_CONFIG_DATA } from "./../gql/queries";
import client from "@/apollo/index";
import get from "lodash.get";
import { GET_FOOTER_DATA, GET_PAGE_DATA } from "../gql/queries";

export const APP_TYPE = "autofix";

export interface ServiceType {
  name: string;
  icon: string;
  desc: string;
}

export interface LabelType {
  code: string;
  value: string;
}

export interface HomeActionType {
  name: string;
  icon: string;
  desc: string;
}

export interface AssetType {
  [key: string]: string;
}

// Query Functions
export const fetchCommonData = (locale: string, page: string) =>
  client.query({
    query: GET_PAGE_DATA,
    variables: {
      app: APP_TYPE,
      locale: locale,
      page,
    },
  });

export const fetchFooter = () =>
  client.query({
    query: GET_FOOTER_DATA,
  });

interface Link {
  link: string;
  name: string;
}

export interface Content {
  name: string;
  links: Link[];
}

interface PoweredBy {
  image: string;
  link: Link;
}

export interface FooterType {
  content?: Content[];
  poweredBy?: PoweredBy;
}

export interface GetFooterType {
  footer: FooterType;
}

export interface ConfigType {
  [code: string]: string;
}

interface ConfigAttributesTypes {
  attributes: {
    code: string;
    value: string;
  };
}

export const getFooterData = async (): Promise<FooterType> => {
  const footerData = await (await fetchFooter()).data;
  const content = get(footerData, "footer.data.attributes.content", {});
  let poweredBy = get(footerData, "footer.data.attributes.poweredBy", {});
  if (poweredBy?.image)
    poweredBy = {
      ...poweredBy,
      image: `${process.env.STRAPI_SERVICE}${getImageUrl(poweredBy.image)}`,
    };

  const footer = {
    content,
    poweredBy,
  };
  return footer;
};

export const fetchConfig = async () =>
  client.query({
    query: GET_CONFIG_DATA,
    variables: {
      app: APP_TYPE,
    },
  });

export const getConfigData = async (): Promise<ConfigType> => {
  const configDataObj = await (await fetchConfig()).data;
  return get(configDataObj, "configs.data", []).reduce(
    (acc: ConfigType, attributeObj: ConfigAttributesTypes) => {
      const { code, value } = get(attributeObj, "attributes");
      acc[code] = value;
      return acc;
    },
    {}
  );
};

// Selector Functions
export const getAssets = (obj: any) => get(obj, "localisedAssets.data", []);
export const getImageUrl = (obj: any) => get(obj, "data.attributes.url", "");
export const getAssetsData = (arr: any) =>
  arr.reduce((acc: any, curr: any) => {
    acc[curr.attributes.fileName] = `${process.env.STRAPI_SERVICE}${getImageUrl(
      curr.attributes.file
    )}`;
    return acc;
  }, {});

export const getLabels = (obj: object) => get(obj, "labels.data", []);

export const getLabelData: any = (arr: any) =>
  arr.reduce((acc: any, curr: any) => {
    const { code, value }: LabelType = curr.attributes;
    acc[code] = value;
    return acc;
  }, {});
