import client from "@/apollo/index";
import get from "lodash.get";
import { APP_TYPE } from "../../common";
import { GET_SERVICES } from "../../gql/serviceQueries";

export interface ServiceType {
  name: string;
  icon: string;
  desc: string;
}
export interface Service {
  attributes: ServiceAttributes;
}

export interface ServiceAttributes {
  name: string;
  icon: Icon;
  desc: null;
}

export interface Icon {
  data: Data;
}

export interface Data {
  attributes: DataAttributes;
}

export interface DataAttributes {
  url: string;
}

interface ServicesWrapper {
  actions: {
    data: Service[];
  };
}
export const getServicesArray = (obj: ServicesWrapper) =>
  get(obj, "services.data", []);

export const fetchServiceData = async ({
  locale,
}: {
  locale: string;
}): Promise<ServiceType[]> => {
  const data = (
    await client.query({
      query: GET_SERVICES,
      variables: {
        app: APP_TYPE,
        locale: locale,
      },
    })
  ).data;
  return getServicesArray(data).map((srv: Service) => {
    return {
      desc: get(srv, "attributes.desc"),
      icon: process.env.STRAPI_SERVICE?.concat(
        get(srv, "attributes.icon.data.attributes.url")
      ),
      name: get(srv, "attributes.name"),
    };
  });
};
