import { utils, Button, Article } from "@albathanext/design-system";
import type { NextPage } from "next";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { CAR_SELECTION } from "@/app/config";

export const ToFix: NextPage = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(CAR_SELECTION);
  };

  return (
    <div
      data-testid="ToFix"
      className="py-24 px-6"
      style={{ backgroundColor: utils.colorSelector("c500") }}
    >
      <Article
        divider
        dividerProps={{
          className: "my-4",
          style: {
            borderColor: utils.colorSelector("p600"),
          },
        }}
        title={<FormattedMessage id="home.tofix.title" />}
        description={
          <span className="text-base ">
            <FormattedMessage id="home.tofix.description" />
          </span>
        }
        titleProps={{
          className: "text-5xl",
          color: utils.colorSelector("p600"),
        }}
        descriptionProps={{
          className: "opacity-80",
        }}
      />
      <div className=" pt-7 flex ">
        <Button
          data-testid="home-tofix-startnow"
          fullWidth
          size="medium"
          variant="contained"
          className="!text-[14px]"
          onClick={handleOnClick}
        >
          <FormattedMessage id="home.tofix.startnow" />
        </Button>
        <div className="w-3" />
        <Button
          fullWidth
          size="medium"
          variant="outlined"
          className={"!border-[0.2px] !text-[14px]"}
          style={{
            borderColor: `${utils.colorSelector("e101")}`,
          }}
        >
          <FormattedMessage id="home.tofix.learn" />
        </Button>
      </div>
    </div>
  );
};
