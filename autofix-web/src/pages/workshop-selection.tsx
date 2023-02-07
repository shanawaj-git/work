import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
import { pageName } from "@/containers/WorkshopSelection";
import { WorkshopSelectionType } from "@/containers/WorkshopSelection/interfaces";

export { default } from "@/containers/WorkshopSelection";

export const getStaticProps: GetStaticProps<WorkshopSelectionType> = async ({
  locale,
}) => {
  const data = await rejectEarly<WorkshopSelectionType>({
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
