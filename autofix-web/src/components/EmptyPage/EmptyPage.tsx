import React, { FC } from "react";

interface EmptyPageProps {
  children?: JSX.Element | JSX.Element[];
  testId?: string;
  className?: string;
  style?: React.CSSProperties;
}

const EmptyPage: FC<EmptyPageProps> = ({
  children,
  testId,
  className,
  style,
  ...props
}) => (
  <div
    {...props}
    data-testid={testId || "EmptyPage"}
    className={["", className].join(" ")}
    style={{
      ...style,
    }}
  >
    {children}
  </div>
);

export default EmptyPage;
