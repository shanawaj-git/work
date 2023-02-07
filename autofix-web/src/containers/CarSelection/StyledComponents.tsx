import styled from "styled-components";
import TextField from "@mui/material/TextField";
import get from "lodash.get";
import { utils } from "@albathanext/design-system";

export const StyledTextField = styled(TextField)`
  width: 100%;
  border-radius: 4px;
  background-color: ${utils.colorSelector("p700")};
  margin-top: 12px !important;

  .MuiInputBase-input {
    border-radius: ${(props) =>
      get(props, "theme.overrides.button.borderRadius", "6px")};
    border-color: ${utils.colorSelector("p700")}66;
    color: white;
  }
`;
