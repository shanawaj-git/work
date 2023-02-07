import { Content } from "@/services/common";
import { Typography, TypographyType } from "@albathanext/design-system";
import React from "react";

export const LinkList = ({ name, links }: Content) => {
  return (
    <div className=" pt-10">
      <Typography
        typographyType={TypographyType.HEAD_LINE}
        className={"font-semibold"}
      >
        {name}
      </Typography>
      {links.map((item) => (
        <Typography
          key={item.name}
          typographyType={TypographyType.HEAD_LINE}
          className="mt-5"
        >
          <span className="font-light opacity-80">{item.name}</span>
        </Typography>
      ))}
    </div>
  );
};
