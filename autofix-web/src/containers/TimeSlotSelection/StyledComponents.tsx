import styled from "styled-components";
import Switch from "@mui/material/Switch";
import { utils } from "@albathanext/design-system";
export const StyledSwitch = styled(Switch)(({}) => ({
  width: 36,
  height: 22,
  padding: 0,
  borderRadius: 36.5,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    color: utils.colorSelector("c100"),
    "&.Mui-checked": {
      transform: "translateX(12px)",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: utils.colorSelector("p700"),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 18,
    borderRadius: 10,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16,
    opacity: 1,
    backgroundColor: utils.colorSelector("p700"),
    boxSizing: "border-box",
  },
}));
