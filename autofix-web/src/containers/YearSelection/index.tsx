import PageHeader from "@/components/PageHeader/PageHeader";
import Section from "@/components/Section";
import {
  Article,
  Button,
  utils,
  HorizontalScrollMenu,
} from "@albathanext/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import { useRouter } from "next/router";
import { LabelType } from "@/services/common";
import { CarYearType } from "@/Types/CarYear";
import { ENGINE_SELECTION } from "@/app/config";
export const pageName = "year.selection";

export interface YearSelectionPropsType {
  years: CarYearType[];
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

interface MenuItemType {
  id: string;
  refId: string;
}

const MINOR_ITEMS_NUMBER = 4;
const YearSelection = ({ years }: YearSelectionPropsType) => {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  const handleOnClickBack = () => {
    router.back();
  };

  const handleOnContinue = (event: MouseEvent) => {
    event.preventDefault();
    router.push({
      pathname: ENGINE_SELECTION,
      query: {
        ...router.query,
        yearId: getSelectedYearRefId(selectedValue),
      },
    });
  };

  const getSelectedYearRefId = (selectedValue: string): string | undefined => {
    return items.find((item) => item.id === selectedValue)?.refId;
  };

  const getMenuItems = useCallback(
    (years: CarYearType[]) =>
      years.map((year) => ({
        id: `${year.value}`,
        refId: year.id,
      })),
    []
  );

  useEffect(() => {
    const menuItems = getMenuItems(years);
    if (menuItems.length > 0) {
      setItems(menuItems);
      setSelectedValue(menuItems[0].id);
    }
  }, [years, getMenuItems]);

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
          title={<FormattedMessage id={`${pageName}.header.title`} />}
          titleProps={{
            color: utils.colorSelector("P200"),
            className: "text-xl  !mt-4",
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
          subTitleProps={{
            className: "text-center !text-[15px] !mb-[20px] !font-light",
          }}
          menuItemTitleProps={{
            className: `!mt-[20px] tracking-[.3px] text-sm font-light`,
            style: { color: utils.colorSelector("C400") },
          }}
          defaultMenuStickColor={utils.colorSelector("C400")}
          selectedMenuStickColor={utils.colorSelector("P800")}
          minorItemsNumber={MINOR_ITEMS_NUMBER}
        />
      </div>

      <div className="w-full px-6 mb-20">
        <Button
          data-testid={`${pageName}-button-continue`}
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleOnContinue}
        >
          <FormattedMessage id={`${pageName}.button.continue`} />
        </Button>
      </div>
    </Section>
  );
};

export default YearSelection;
