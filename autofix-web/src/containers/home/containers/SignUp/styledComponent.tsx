import styled from "styled-components";
import { Input, utils } from "@albathanext/design-system";
import get from "lodash.get";

export const InputStyled = styled(Input)`
  .MuiInputBase-input {
    background: transparent;
    border-radius: ${(props) =>
      get(props, "theme.overrides.button.borderRadius", "6px")};
    border-color: ${utils.colorSelector("e101")};
    padding-top: 16px;
    padding-bottom: 16px;
    color: white;
  }
  .MuiInputLabel-root .MuiInputLabel-root.Mui-focused {
    color: white;
  }
`;
