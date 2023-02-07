import styled from "styled-components";
import { ImageCardWithCta, utils } from "@albathanext/design-system";
export const ServiceCard = styled(ImageCardWithCta)`
  .image-card-title {
    font-weight: 200;
    font-size: 14px;
    line-height: 38px;
    color: ${utils.colorSelector("c200")};
    white-space: nowrap;
  }
  > div {
    background: ${utils.colorSelector("p700")};
    border-radius: 4px;
    height: 78px;
    width: max-content;
    padding: 20px;
  }
  .image-card-icon {
    width: 38px;
    height: 38px;
  }
`;
