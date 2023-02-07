import styled from "styled-components";
import TextField from "@mui/material/TextField";
import get from "lodash.get";
import { utils, Carousel, Button } from "@albathanext/design-system";

export const StyledTextField = styled(TextField)`
  width: 100%;
  border-radius: 4px;
  margin-top: 12px !important;

  .MuiInputBase-input {
    border-radius: ${(props) =>
      get(props, "theme.overrides.button.borderRadius", "6px")};
    border-color: ${utils.colorSelector("e101")};
    color: white;
    background-color: ${utils.colorSelector("p700")};
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${utils.colorSelector("c100")};
  }
  .MuiFormHelperText-root {
    background: transparent;
  }
`;

export const StyledButton = styled(Button)`
  :disabled {
    background-color: #e0e0e0 !important;
  }
`;

export const StyledCarousel = styled(Carousel)`
  margin-top: 40px;
  .MuiMobileStepper-dot,
  .MuiMobileStepper-dot {
    border-radius: 0;
    width: 9.59px;
    height: 1px;
    opacity: 0.4;
    border: 1px solid #cccfcd;
  }

  .MuiMobileStepper-dotActive {
    width: 88px;
    border: 1px solid #3c4f4e;
  }

  .MuiButton-root {
    min-width: 36px;
    min-height: 36px;
    width: 36px;
    height: 36px;
    border-radius: 2px;
    background: transparent;
    border: 1px solid #e6e6e2;
    margin-right: 0;
  }

  .MuiButton-root[disabled] {
    border: 1px solid ${utils.colorSelector("b100")};
    background: linear-gradient(0deg, #1f2222, #1f2222),
      linear-gradient(0deg, rgba(220, 220, 220, 0.2), rgba(220, 220, 220, 0.2));
  }

  .MuiPaper-root {
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
`;
