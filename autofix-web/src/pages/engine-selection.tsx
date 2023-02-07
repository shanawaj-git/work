export { default } from "@/containers/EngineSelection";
import {
  EngineSelectionPropsType,
  pageName,
} from "@/containers/EngineSelection";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<EngineSelectionPropsType> = async ({
  locale,
}) => {
  const data = await rejectEarly<EngineSelectionPropsType>({
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
