import Section from "@/components/Section";
import React, { useState } from "react";
import {
  Article,
  Button,
  utils,
  TypographyType,
  Typography,
} from "@albathanext/design-system";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import confirmIcon from "@/assets/confirm.svg";
import { LabelType } from "@/services/common";
import { getCurrency, getTotalForMax } from "@/utils/index";
import { WORKSHOP_SELECTION } from "@/app/config";

export const pageName = "recommended.maintenance";
export interface RecommendedMaintenanceType {
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}
const data = [
  {
    title: "Rotate tires 1",
    cost: "500 - 800 USD",
  },
  {
    title: "Rotate tires 2",
    cost: "500 - 800 USD",
  },
  {
    title: "Rotate tires 3",
    cost: "500 - 800 USD",
    subItems: [
      "Brake linings",
      "Drums and brake pads/discs",
      "Ball joints and dust covers",
      "Drive shaft boots",
      "Engine coolant",
      "Exhaust pipes and mountings",
      "Radiator and condenser",
    ],
  },
];

interface stateType {
  [key: string]: boolean;
}
export interface itemType {
  title: string;
  cost: string;
  subItems?: string[];
}
interface pagePropsType {
  suggestedMaintenance?: itemType[];
}

const RecommendedMaintenance = ({
  suggestedMaintenance = data,
}: pagePropsType) => {
  const router = useRouter();
  const onBackClickHandler = () => {
    router.back();
  };
  const [selected, setSelected] = useState<stateType>({});
  const handleSelection = (e: number) => {
    const _selected = selected;
    if (_selected[`item-${e}`]) {
      delete _selected[`item-${e}`];
    } else {
      _selected[`item-${e}`] = true;
    }
    setSelected({ ..._selected });
  };
  const returnSelected = () =>
    suggestedMaintenance.filter((e, i) => selected[`item-${i}`]);

  return (
    <Section
      className={`flex flex-col h-screen`}
      style={{ backgroundColor: utils.colorSelector("C500") }}
      data-testid={`${pageName}`}
    >
      <div className="flex flex-col h-screen">
        <PageHeader>
          <Button
            data-testid={`${pageName}-back-button`}
            className={`mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px] `}
            style={{
              borderColor: utils.colorSelector("b100"),
              backgroundColor: utils.colorSelector("P700"),
            }}
            onClick={onBackClickHandler}
          >
            <img src={BackArrow} alt="BackArrow" />
          </Button>
          <Article
            title={<FormattedMessage id={`${pageName}.header.title`} />}
            titleProps={{
              color: utils.colorSelector("P200"),
              className: "text-xl whitespace-pre-line !mt-4",
            }}
            description={
              <FormattedMessage id={`${pageName}.header.description`} />
            }
            descriptionProps={{
              color: utils.colorSelector("P500"),
              className: "text-sm mt-3",
            }}
          />
        </PageHeader>
        <div className="flex flex-1 overflow-hidden">
          <div className=" px-6 py-5 h-full overflow-auto w-full">
            {suggestedMaintenance.map((item: itemType, index: number) => (
              <ListItem
                key={item.title}
                onClick={handleSelection}
                index={index}
                item={item}
                checked={selected[`item-${index}`] ? true : false}
              />
            ))}
          </div>
        </div>
        <Footer
          totalAmount={getTotalForMax(returnSelected())}
          currency={getCurrency(suggestedMaintenance)}
          onContinue={() => router.push(WORKSHOP_SELECTION)}
        />
      </div>
    </Section>
  );
};

interface ListItemType {
  checked?: boolean;
  item: itemType;
  index: number;
  onClick: (e: number) => void;
}
interface isCheckedType {
  checkboxStyle: React.CSSProperties;
  container: React.CSSProperties;
}

export const removeSpaces = (str: string) => str.split(" ").join("-");
const ListItem = ({ checked, item, index, onClick }: ListItemType) => {
  const isChecked: isCheckedType = {
    checkboxStyle: {},
    container: {},
  };
  if (checked) {
    isChecked.checkboxStyle.backgroundImage = `url(${confirmIcon})`;
    isChecked.checkboxStyle.backgroundSize = "cover";
    isChecked.container.border = "1px solid#2E4341";
  } else {
    isChecked.checkboxStyle.border = `1px solid ${utils.colorSelector("e100")}`;
    isChecked.container.border = "";
  }
  return (
    <div
      className="bg-white p-4 border-[#00000014] border-2 rounded-md mb-2"
      data-testid={
        checked
          ? `${removeSpaces(item.title)}-selected`
          : removeSpaces(item.title)
      }
      style={{ ...isChecked.container }}
      onClick={() => onClick(index)}
    >
      <div className="flex ">
        <div>
          <div
            data-testid={
              checked
                ? `${removeSpaces(item.title)}-checked`
                : `${removeSpaces(item.title)}-unchecked`
            }
            className={"w-5 h-5 rounded-full "}
            style={{ ...isChecked.checkboxStyle }}
          />
        </div>

        <div className="w-full ml-4">
          <Article
            title={item.title}
            titleProps={{
              typographyType: TypographyType.caption,
              className: "font-semibold text-[15px]",
            }}
            description={
              <div className="my-3">
                <ul>
                  {item.subItems &&
                    item.subItems.map((subItem: string) => {
                      return (
                        <li key={subItem}>
                          <Typography
                            {...{
                              typographyType: TypographyType.footNote,
                              style: {
                                color: utils.colorSelector("P700"),
                              },
                              className: "opacity-75 text-[14px]",
                            }}
                          >
                            {" "}
                            - {subItem}
                          </Typography>
                        </li>
                      );
                    })}
                </ul>
                <div className="!w-full !my-3 !border" />
                <div className="flex justify-between">
                  <Typography
                    {...{
                      typographyType: TypographyType.footNote,
                      style: {
                        color: utils.colorSelector("P700"),
                      },
                      className: "opacity-75 text-[14px]",
                    }}
                  >
                    <FormattedMessage id="recommended.maintenance.footer.approx" />
                  </Typography>
                  <Typography
                    {...{
                      typographyType: TypographyType.footNote,
                      style: {
                        color: utils.colorSelector("P700"),
                      },
                      className: "opacity-75 text-[14px]",
                    }}
                    className="font-semibold"
                  >
                    {item.cost}
                  </Typography>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

interface footerType {
  onContinue?: () => void;
  totalAmount: number;
  currency: string;
}
export const toFixed = (num: string) => Number(num).toFixed(2);

const Footer = ({ onContinue, totalAmount, currency }: footerType) => {
  return (
    <div className="p-6 bg-white drop-shadow-xl">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className=" text-base font-semibold">Total to pay</span>
          <span
            data-testid="total-amount"
            className=" text-base bg-black px-3 py-1 text-white font-semibold"
          >
            {toFixed(totalAmount + "")} {currency}
          </span>
        </div>
        <div className="h-5" />
        <Button
          data-testid={`${pageName}-button-continue`}
          variant="contained"
          fullWidth
          size="medium"
          onClick={onContinue}
        >
          <FormattedMessage id={`${pageName}.footer.continue`} />
        </Button>
      </div>
    </div>
  );
};
export default RecommendedMaintenance;
