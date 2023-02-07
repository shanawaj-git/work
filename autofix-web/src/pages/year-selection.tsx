export { default, pageName } from "@/containers/YearSelection";
import { YearSelectionPropsType, pageName } from "@/containers/YearSelection";
import { getCarYears } from "@/services/yearSelection";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<YearSelectionPropsType> = async ({
  locale,
}) => {
  const data = await rejectEarly<YearSelectionPropsType>({
    def: { years: [] },
    fn: async () => {
      const [commonData, years] = await Promise.all([
        getCommonPageContent({
          locale: locale as I18NLocale,
          pageName: pageName,
        }),
        getCarYears(),
      ]);
      return {
        [locale as I18NLocale]: { labels: get(commonData, "labels") },
        years,
      };
    },
  });
  return {
    props: {
      ...data,
    },
  };
};
