import styled from 'styled-components';

import { colorSelector } from 'themes';

export const HeroSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  .title-img {
    width: 100%;
    height: auto;
  }

  .title-container {
    margin-top: 20px;
    width: 100%;
    width: 100%;
  }

  .title-logo {
    margin-top: 5px;
  }

  .headline {
    color: ${colorSelector('font-tertiary')};
    margin-top: 16px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;
