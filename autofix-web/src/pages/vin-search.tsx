export { default } from "@/containers/VinSearch";

import { VinSearchTypes, pageName, carouselItem } from "@/containers/VinSearch";
import { getConfigData } from "@/services/common";
import { fetchVinCarousel } from "@/services/vinSearch/carousel";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<VinSearchTypes> = async ({
  locale,
}) => {
  const data = await rejectEarly<VinSearchTypes>({
    def: { config: {}, carousel: [] as carouselItem[] },
    fn: async () => {
      const [commonData, carousel, config] = await Promise.all([
        getCommonPageContent({
          locale: locale as I18NLocale,
          pageName: pageName,
        }),
        fetchVinCarousel({ locale: locale as I18NLocale }),
        getConfigData(),
      ]);
      return {
        [locale as I18NLocale]: { labels: get(commonData, "labels") },
        config,
        carousel,
      };
    },
  });

  return {
    props: {
      ...data,
    },
  };
};
