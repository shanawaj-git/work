import React, { FC } from "react";
import { utils } from "@albathanext/design-system";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  className?: string;
  testId?: string;
  style?: React.CSSProperties;
}

const Loading: FC<LoadingProps> = ({ testId, className, style, ...props }) => (
  <div
    data-testid={testId || "Loading"}
    className={["h-screen", className].join(" ")}
    style={{
      backgroundColor: utils.colorSelector("P700"),
    }}
  >
    <CircularProgress
      className="flex absolute"
      style={{
        ...style,
        color: utils.colorSelector("c100"),
        top: "40%",
        left: "45%",
      }}
    />
  </div>
);

export default Loading;
