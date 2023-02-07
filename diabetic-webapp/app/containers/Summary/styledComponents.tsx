import styled from 'styled-components';
import { Typography } from '@albathanext/design-system';

export const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const HeaderDescription = styled.div`
  display: block;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;
export const HeaderImageContainer = styled.div`
  direction: rtl;
`;

export const HeaderImage = styled.img`
  height: 460px;
  width: 315px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-left: 20px;
  .MuiTypography-root.MuiTypography-h1.suffix-title {
    font-size: 28px;
    margin-bottom: 18px;
  }
  .MuiTypography-root.MuiTypography-root.bold-text {
    color: #020a0a;
    font-weight: bold;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    margin-top: 18px;
    line-height: 22px;
    margin-bottom: 2%;
  }
`;
