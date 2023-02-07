import styled from "styled-components";
import TextField from "@mui/material/TextField";
import get from "lodash.get";
import { utils } from "@albathanext/design-system";

export const StyledTextField = styled(TextField)`
  width: 100%;
  border-radius: 4px;
  background-color: #1f2222;
  padding-right: 0px;

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 0px solid ${utils.colorSelector("c100")};
  }

  & .MuiInputBase-formControl {
    padding-right: 30px !important;
  }

  .MuiAutocomplete-inputRoot {
    border-radius: ${(props) =>
      get(props, "theme.overrides.button.borderRadius", "6px")};
    border-color: ${utils.colorSelector("e101")};
    color: white;
    padding-left: 50px;
    padding-right: 0px;
  }

  .MuiAutocomplete-popupIndicator {
    display: none;
  }
`;
