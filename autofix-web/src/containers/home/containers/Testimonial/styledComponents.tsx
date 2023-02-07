import styled from "styled-components";
import { Carousel } from "@albathanext/design-system";
import { utils } from "@albathanext/design-system";

export const StyledCarousel = styled(Carousel)`
  padding-right: 24px;
  padding-left: 24px;
  margin-top: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .MuiMobileStepper-dot,
  .MuiMobileStepper-dot {
    border-radius: 0;
    width: 9.59px;
    height: 1px;
    opacity: 0.4;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  .MuiMobileStepper-dotActive {
    width: 88px;
    border: 1px solid ${utils.colorSelector("e100")};
  }

  .MuiButton-root {
    min-width: 36px;
    min-height: 36px;
    width: 36px;
    height: 36px;
    border-radius: 2px;
    background: ${utils.colorSelector("p300")};
    border: 1px solid ${utils.colorSelector("b100")};
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
