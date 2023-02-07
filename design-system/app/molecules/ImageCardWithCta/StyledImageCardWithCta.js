import styled from 'styled-components';
import { colorSelector } from 'themes';

export const ImageCardWithCtaWrapper = styled.div`
  display: flex;
  background: ${colorSelector('c200')};
  box-shadow: 0px 3px 20px rgba(96, 108, 116, 0.13);
  border-radius: 10px;
  padding: 24px 16px;

  .image-card-title,
  .image-card-subTitle {
    color: ${colorSelector('fontPrimary')};
  }

  .image-card-icon {
    width: 24px;
    height: 24px;
  }

  .image-card-content {
    margin-left: 13px;
  }

  .image-card-button {
    background: none;
    margin-left: auto;
    width: auto;
    height: auto;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;
