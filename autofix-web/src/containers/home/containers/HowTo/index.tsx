import Section from "@/components/Section";
import type { NextPage } from "next";
import { Article, utils } from "@albathanext/design-system";
import React from "react";
import { FormattedMessage } from "react-intl";
import { HomeActionType } from "@/services/common";
import { ActionCard } from "./styledComponents";

export const HowTo: NextPage<{ actions: HomeActionType[] }> = ({ actions }) => {
  return (
    <Section
      data-testid="howto-section"
      style={{
        background: utils.colorSelector("c500"),
      }}
      className="flex flex-col justify-between py-[100px]  space-y-8"
    >
      <div className="px-6 ">
        <Article
          title={<FormattedMessage id="home.howto.title" />}
          description={<FormattedMessage id="home.howto.description" />}
          divider
          dividerProps={{
            className: "mt-2",
            style: { borderColor: utils.colorSelector("P300") },
          }}
          titleProps={{
            className: "leading-10 text-[34px] ",
            color: utils.colorSelector("p600"),
          }}
          descriptionProps={{
            className: "text-base font-light",
            color: utils.colorSelector("p700"),
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full px-6 space-y-4">
        {actions &&
          actions.map((action) => (
            <ActionCard
              className="w-[327px] md:w-[600px] mx-0"
              key={action.name}
              cardIcon={action.icon}
              title={action.name}
              subTitle={action.desc}
            />
          ))}
      </div>
    </Section>
  );
};
