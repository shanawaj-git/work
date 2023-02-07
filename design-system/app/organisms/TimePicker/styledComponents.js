import styled from 'styled-components';
import { colorSelector } from 'themes';

export const TimeContainer = styled.div`
  display: flex;
  width: 101px;
  height: 52.5px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ selected }) =>
    selected &&
    `
    background-color: #12a1c0;
  `}
  ${({ disabled }) =>
    disabled &&
    `
     pointer-events: none;
  `}

  > p.MuiTypography-root {
    color: ${colorSelector('p400')};
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    text-align: center;
    ${({ selected }) =>
      selected &&
      `
    font-weight: 600;
    color: ${colorSelector('c200')};
  `}
    ${({ disabled }) =>
      disabled &&
      `
    color: ${colorSelector('c600')};
  `}
  }
`;
