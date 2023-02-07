import React, { FC } from "react";
import Section from "@/components/Section";
import { utils } from "@albathanext/design-system";

interface PageHeaderProps {
  children?: JSX.Element | JSX.Element[];
  testId?: string;
  className?: string;
  style?: React.CSSProperties;
}

const PageHeader: FC<PageHeaderProps> = ({
  children,
  testId,
  className,
  style,
  ...props
}: PageHeaderProps) => (
  <Section
    {...props}
    className={"p-6".concat(" ", className || "")}
    data-testid={testId || "PageHeader"}
    style={{
      ...style,
      backgroundColor: utils.colorSelector("P600"),
      minHeight: "fit-content",
      ...style,
    }}
  >
    {children}
  </Section>
);

export default PageHeader;
