import Section from "@/components/Section";
import { FooterType } from "@/services/common";
import { Typography, TypographyType, utils } from "@albathanext/design-system";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";
import { app } from "../../config";
import { LinkList } from "./LinkList";

export const Footer: NextPage<{ footer: FooterType | undefined }> = ({
  footer,
}) => {
  const { formatMessage } = useIntl();
  return (
    <Section
      style={{ backgroundColor: utils.colorSelector("p600") }}
      className={"flex flex-col text-white"}
    >
      <div className={"px-6 py-20 flex-1"}>
        <Image
          alt="logo"
          width={app.LOGO_WIDTH}
          height={app.LOGO_HEIGHT}
          src={formatMessage({
            id: "app.logo",
          })}
        />
        {footer?.content &&
          footer?.content.map((item) => (
            <LinkList key={item.name} name={item.name} links={item.links} />
          ))}
      </div>
      <div className="flex  flex-1 justify-center items-center border-t border-warmGray-600">
        <Typography
          className="mr-4 opacity-80"
          typographyType={TypographyType.FOOT_NOTE}
        >
          {footer?.poweredBy && footer?.poweredBy.link?.name}
        </Typography>
        <Image
          alt="footer-logo"
          width={"129px"}
          height={"23px"}
          src={(footer?.poweredBy && footer?.poweredBy.image) || "/logo.svg"}
        />
      </div>
    </Section>
  );
};
