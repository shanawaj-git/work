import { gql } from "@apollo/client";

export const GET_VIN_CAROUSEL = gql`
  query ($locale: I18NLocaleCode!, $app: String!) {
    vinCarousels(
      locale: $locale
      filters: { app: { name: { eq: $app } } }
      publicationState: LIVE
    ) {
      data {
        attributes {
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
