import { gql } from "@apollo/client";

export const GET_ACTIONS = gql`
  query ($locale: I18NLocaleCode!, $app: String!) {
    actions(
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
