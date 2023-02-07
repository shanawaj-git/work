import { gql } from "@apollo/client";

export const GET_TESTIMONIALS = gql`
  query ($locale: I18NLocaleCode!, $app: String!) {
    testimonials(
      locale: $locale
      filters: { app: { name: { eq: $app } } }
      publicationState: LIVE
    ) {
      data {
        attributes {
          img {
            data {
              attributes {
                url
              }
            }
          }
          content
          customer
          rating
        }
      }
    }
  }
`;
