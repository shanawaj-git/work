import client from "@/apollo/index";
import { GET_TESTIMONIALS } from "@/services/gql/testimonialQueries";
import get from "lodash.get";
import { APP_TYPE } from "@/services/common";
import { I18NLocale } from "@/utils/index";

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

export const fetchTestimonialData = async (
  input: FetchTestimonialDataType
): Promise<TestimonialType[]> => {
  const data = (
    await client.query({
      query: GET_TESTIMONIALS,
      variables: {
        app: APP_TYPE,
        locale: input.locale,
      },
    })
  ).data;
  return data.testimonials.data.map((e: any) => {
    return {
      ...e.attributes,
      img: process.env.STRAPI_SERVICE?.concat(
        get(e, "attributes.img.data.attributes.url")
      ),
    };
  });
};
