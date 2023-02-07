export { default } from "@/containers/TimeSlotSelection";
import {
  TimeSlotSelectionProps,
  pageName,
} from "@/containers/TimeSlotSelection";
import get from "lodash.get";
import { GetStaticProps } from "next";
import { getCommonPageContent, I18NLocale, rejectEarly } from "../utils";
export const getStaticProps: GetStaticProps<TimeSlotSelectionProps> = async ({
  locale,
}) => {
  const data = await rejectEarly<TimeSlotSelectionProps>({
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
