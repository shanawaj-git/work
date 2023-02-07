import { HomePageProps } from "@/containers/home";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { fetchTestimonialData } from "@/services/home/testimonial";
import {
  getCommonPageContent,
  HomeContentType,
  I18NLocale,
  rejectEarly,
} from "../utils";
import { fetchServiceData } from "@/services/home/service";
import { fetchActionsData } from "@/services/home/homeAction";
import { getFooterData } from "@/services/common";
export { default } from "@/containers/home";

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const data: HomeContentType = await rejectEarly<HomeContentType>({
    def: {},
    fn: async () => {
      const [commonData, testimonials, services, actions, footer] =
        await Promise.all([
          getCommonPageContent({
            locale: locale as I18NLocale,
            pageName: "home",
          }),
          fetchTestimonialData({
            locale: locale as I18NLocale,
          }),
          fetchServiceData({ locale: locale as I18NLocale }),
          fetchActionsData({ locale: locale as I18NLocale }),
          getFooterData(),
        ]);
      return {
        ...commonData,
        actions,
        services,
        testimonials,
        footer,
      };
    },
  });

  const {
    labels = [],
    assets = [],
    services = [],
    actions = [],
    testimonials = [],
    footer = {},
  } = data;

  return {
    props: {
      [locale as I18NLocale]: {
        assets,
        labels,
      },
      actions,
      services,
      testimonials,
      footer,
    },
    revalidate: 120,
  };
};
