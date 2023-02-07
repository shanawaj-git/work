import { autoFixClient } from "@/app/apollo";
import { GET_WORKSHOPS } from "@/services/gql/workshopsQueries";
import { WorkshopsPayload } from "@/containers/WorkshopSelection/interfaces";

export const getWorkshopsQuery = async (payload: WorkshopsPayload) => {
  return await autoFixClient.query({
    query: GET_WORKSHOPS,
    variables: payload,
  });
};
