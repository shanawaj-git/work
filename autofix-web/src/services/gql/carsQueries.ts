import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query ($yearId: ID, $modelId: ID, $engineId: ID, $pageSize: Int) {
    cars(
      filters: {
        year: { id: { eq: $yearId } }
        model: { id: { eq: $modelId } }
        engine_type: { id: { eq: $engineId } }
      }
      pagination: { pageSize: $pageSize }
      publicationState: LIVE
    ) {
      data {
        attributes {
          engine_type {
            data {
              id
              attributes {
                name
              }
            }
          }
          model {
            data {
              id
              attributes {
                name
                makerId {
                  data {
                    id
                    attributes {
                      name
                      logo
                    }
                  }
                }
              }
            }
          }
          year {
            data {
              id
              attributes {
                value
              }
            }
          }
          image
        }
      }
    }
  }
`;
