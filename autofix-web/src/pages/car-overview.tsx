export { default } from "@/containers/CarOverview";
import {
  CarOverviewSelectionPropsType,
  pageName,
} from "@/containers/CarOverview";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<
  CarOverviewSelectionPropsType
> = async ({ locale }) => {
  const data = await rejectEarly<CarOverviewSelectionPropsType>({
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
