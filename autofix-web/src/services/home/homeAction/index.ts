import { GET_ACTIONS } from "../../gql/actionQueries";
import client from "@/apollo/index";
import get from "lodash.get";
import { APP_TYPE } from "../../common";

export interface HomeActionType {
  name: string;
  icon: string;
  desc: string;
}

interface Action {
  attributes: ActionAttributes;
}

interface ActionAttributes {
  name: string;
  icon: Icon;
  desc: null;
}

interface Icon {
  data: Data;
}

interface Data {
  attributes: DataAttributes;
}

interface DataAttributes {
  url: string;
}

interface ActionsWrapper {
  actions: {
    data: Action[];
  };
}

export const getActionsArray = (obj: ActionsWrapper) =>
  get(obj, "actions.data", []);

export const fetchActionsData = async ({
  locale,
}: {
  locale: string;
}): Promise<HomeActionType[]> => {
  const { data } =
    (await client.query({
      query: GET_ACTIONS,
      variables: {
        app: APP_TYPE,
        locale: locale,
      },
    })) || {};
  return getActionsArray(data).map((action: Action) => {
    return {
      desc: get(action, "attributes.desc"),
      icon: process.env.STRAPI_SERVICE?.concat(
        get(action, "attributes.icon.data.attributes.url")
      ),
      name: get(action, "attributes.name"),
    };
  });
};
