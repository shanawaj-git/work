export { default, pageName } from "@/containers/MileageSelection";
import {
  MileageSelectionPropsType,
  pageName,
} from "@/containers/MileageSelection";
import { getConfigData } from "@/services/common";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<
  MileageSelectionPropsType
> = async ({ locale }) => {
  const data = await rejectEarly<MileageSelectionPropsType>({
    def: { config: {} },
    fn: async () => {
      const [commonData, config] = await Promise.all([
        getCommonPageContent({
          locale: locale as I18NLocale,
          pageName: pageName,
        }),
        getConfigData(),
      ]);
      return {
        [locale as I18NLocale]: { labels: get(commonData, "labels") },
        config,
      };
    },
  });
  return {
    props: {
      ...data,
    },
  };
};
