import { gql } from "@apollo/client";

export const GET_WORKSHOPS = gql`
  query ($payload: WorkshopSearchInput) {
    fetchWorkshops(input: $payload) {
      id
      name
      rating
      address {
        location {
          coordinates
        }
      }
    }
  }
`;
