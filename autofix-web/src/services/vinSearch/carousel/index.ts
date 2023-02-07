import client from "@/apollo/index";
import get from "lodash.get";
import { APP_TYPE } from "@/services/common";
import { I18NLocale } from "@/utils/index";
import { GET_VIN_CAROUSEL } from "@/services/gql/vinCarousel";
import { carouselItem } from "@/containers/VinSearch";

export interface TestimonialType {
  title: string;
  content: string;
  img: string;
  rating: number;
  customer: string;
}

export interface FetchTestimonialDataType {
  locale: I18NLocale;
}

export const fetchVinCarousel = async (
  input: FetchTestimonialDataType
): Promise<carouselItem[]> => {
  const data = (
    await client.query({
      query: GET_VIN_CAROUSEL,
      variables: {
        app: APP_TYPE,
        locale: input.locale,
      },
    })
  ).data;

  interface vinCarouselsItems {
    attributes: {
      description: string;
      image: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  }

  return data.vinCarousels.data.map((e: vinCarouselsItems) => {
    return {
      description: get(e, "attributes.description", ""),
      image: process.env.STRAPI_SERVICE?.concat(
        get(e, "attributes.image.data.attributes.url")
      ),
    };
  });
};
