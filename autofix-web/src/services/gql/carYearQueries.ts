import { gql } from "@apollo/client";

export const GET_CAR_YEARS = gql`
  query {
    years(pagination: { pageSize: 50 }, publicationState: LIVE) {
      data {
        id
        attributes {
          value
        }
      }
    }
  }
`;
