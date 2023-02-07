import styled from 'styled-components';
import { colorSelector } from 'themes';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 25%;
  align-items: center;
  background-color: ${colorSelector('p400')};
  min-height: 100vh;
  min-width: 100%;
`;

export const LogoImage = styled.img`
  margin-right: auto;
  margin-left: auto;
  display: block;
`;
