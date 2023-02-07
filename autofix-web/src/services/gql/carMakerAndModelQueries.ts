import { gql } from "@apollo/client";

export const GET_CAR_MAKERS_AND_MODELS = gql`
  query ($page: Int!) {
    makers(pagination: { limit: $page }, publicationState: LIVE) {
      data {
        id
        attributes {
          logo
          name
          models {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
