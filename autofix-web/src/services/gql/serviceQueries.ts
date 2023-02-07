import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query ($locale: I18NLocaleCode!, $app: String!) {
    services(
      locale: $locale
      filters: { app: { name: { eq: $app } } }
      publicationState: LIVE
    ) {
      data {
        attributes {
          name
          icon {
            data {
              attributes {
                url
              }
            }
          }
          desc
        }
      }
    }
  }
`;
