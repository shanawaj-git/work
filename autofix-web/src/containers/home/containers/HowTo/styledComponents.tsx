import styled from "styled-components";
import { ImageCardWithCta } from "@albathanext/design-system";
export const ActionCard = styled(ImageCardWithCta)`
  .image-card-title {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.3 px;
    font-weight: 300;
  }
  > div {
    height: 140px;
    min-width: 327px;
    padding: 8px;
    margin-right: 0;
    margin-left: 0;
    border-radius: 4px;
    gap: 20px;
  }
  .image-card-icon {
    width: 38px;
    height: 38px;
    margin-top: 8px;
    margin-left: 8px;
  }
  .image-card-subTitle {
    font-size: 14px;
    line-height: 24px;
    font-weight: 300;
    line-height: 1.5;
    width: 237px;
    padding-right: 8px;
  }
  .image-card-content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 16px;
    gap: 12px;
    margin-left: 0;
  }
`;
