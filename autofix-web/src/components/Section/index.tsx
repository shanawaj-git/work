import React from "react";

interface SectionProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  testid?: string;
  style?: React.CSSProperties;
}

const Section = ({ children, testid, ...props }: SectionProps) => {
  return (
    <div
      data-testid={testid || "Section"}
      {...props}
      className={["min-h-screen", props.className].join(" ")}
    >
      {children}
    </div>
  );
};

export default Section;
