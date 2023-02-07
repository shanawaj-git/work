import { gql } from "@apollo/client";

export const GET_PAGE_DATA = gql`
  query ($locale: I18NLocaleCode!, $page: String!, $app: String!) {
    labels(
      locale: $locale
      pagination: { limit: 100 }
      filters: { code: { startsWith: $page }, app: { name: { eq: $app } } }
      publicationState: LIVE
    ) {
      data {
        attributes {
          code
          value
        }
      }
    }

    localisedAssets(
      filters: {
        or: [
          { fileName: { startsWith: $page } }
          { fileName: { startsWith: "app" } }
        ]
        app: { name: { eq: $app } }
      }
      publicationState: LIVE
    ) {
      data {
        attributes {
          fileName
          file {
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

export const GET_CONFIG_DATA = gql`
  query ($app: String!) {
    configs(filters: { app: { name: { eq: $app } } }, publicationState: LIVE) {
      data {
        attributes {
          code
          value
        }
      }
    }
  }
`;

export const GET_FOOTER_DATA = gql`
  {
    footer {
      data {
        attributes {
          poweredBy {
            image {
              data {
                attributes {
                  url
                }
              }
            }
            link {
              link
              name
            }
          }
          content {
            name
            links {
              name
              link
            }
          }
        }
      }
    }
  }
`;
