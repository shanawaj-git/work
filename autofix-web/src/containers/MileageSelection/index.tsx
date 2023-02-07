import PageHeader from "@/components/PageHeader/PageHeader";
import Section from "@/components/Section";
import {
  Article,
  Button,
  utils,
  HorizontalScrollMenu,
} from "@albathanext/design-system";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import { useRouter } from "next/router";
import range from "lodash.range";
import { ConfigType, LabelType } from "@/services/common";
import get from "lodash.get";
import { CAR_OVERVIEW } from "@/app/config";
export const pageName = "mileage.selection";
export interface MileageSelectionPropsType {
  config: ConfigType;
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

interface MileageScrollPropsType {
  start: number;
  stop: number;
  step: number;
}

interface MenuItemType {
  id: string;
}

const MileageSelection = ({ config }: MileageSelectionPropsType) => {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const handleOnClickBack = () => {
    router.back();
  };

  const handleOnClick = () => {
    router.push({
      pathname: CAR_OVERVIEW,
      query: {
        ...router.query,
        mileage: selectedValue,
      },
    });
  };

  const getItems = (start: number, stop: number, step: number) =>
    range(start, stop + step, step).map((val) => ({
      id: `${val}`,
    }));

  const getRangeValues = (config: ConfigType): MileageScrollPropsType => ({
    start: Number(get(config, `${pageName}.range.start`)),
    stop: Number(get(config, `${pageName}.range.stop`)),
    step: Number(get(config, `${pageName}.range.step`)),
  });

  useEffect(() => {
    const { start, stop, step } = getRangeValues(config);
    setItems(getItems(start, stop, step));
    setSelectedValue(`${start}`);
  }, [config]);

  return (
    <Section
      className={`flex flex-col justify-between h-screen`}
      style={{
        backgroundColor: utils.colorSelector("C500"),
      }}
      data-testid={`${pageName}`}
    >
      <PageHeader>
        <Button
          data-testid={`${pageName}-back-button`}
          className={`mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px]`}
          style={{
            borderColor: "rgba(220, 220, 220, 0.2)",
            backgroundColor: utils.colorSelector("P700"),
          }}
          onClick={handleOnClickBack}
        >
          <img src={BackArrow} alt="BackArrow" />
        </Button>
        <Article
          title={<FormattedMessage id={`mileage.selection.header.title`} />}
          titleProps={{
            color: utils.colorSelector("P200"),
            className: "text-xl whitespace-pre-line !mt-4",
          }}
        />
      </PageHeader>

      <div
        data-testid={`${pageName}-horizontalScrollMenu`}
        className="flex flex-col justify-end h-full pt-10"
      >
        <HorizontalScrollMenu
          items={items}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          subTitle={"km"}
          subTitleProps={{
            className: "text-center !text-[15px] !mb-[20px] !font-light",
          }}
          menuItemTitleProps={{
            className: `text-[${utils.colorSelector(
              "C400"
            )}] !mt-[20px] text-sm tracking-[.3px]  font-light`,
            style: { color: utils.colorSelector("C400") },
          }}
          defaultMenuStickColor={utils.colorSelector("C400")}
          selectedMenuStickColor={utils.colorSelector("P800")}
          minorItemsNumber={4}
        />
      </div>

      <div className="w-full px-6 mb-20">
        <Button
          data-testid={`${pageName}-button-continue`}
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleOnClick}
        >
          <FormattedMessage id={`${pageName}.button.continue`} />
        </Button>
      </div>
    </Section>
  );
};

export default MileageSelection;
