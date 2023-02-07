import styled from 'styled-components';
import { colorSelector } from 'themes';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorSelector('p300')};
  min-height: 100vh;
  min-width: 100%;
`;
