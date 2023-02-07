import {
  RecommendedMaintenanceType,
  pageName,
} from "@/containers/RecommendedMaintenance";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";

export { default } from "@/containers/RecommendedMaintenance";

export const getStaticProps: GetStaticProps<
  RecommendedMaintenanceType
> = async ({ locale }) => {
  const data = await rejectEarly<RecommendedMaintenanceType>({
    def: {},
    fn: async () => {
      const [commonData] = await Promise.all([
        getCommonPageContent({
          locale: locale as I18NLocale,
          pageName: pageName,
        }),
      ]);
      return {
        [locale as I18NLocale]: { labels: get(commonData, "labels") },
      };
    },
  });
  return {
    props: {
      ...data,
    },
  };
};
