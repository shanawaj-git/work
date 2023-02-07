import styled from 'styled-components';
import { colorSelector } from 'themes';
import { Typography } from '@albathanext/design-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

export const SectionWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;

  > div {
    margin-bottom: 16px;
  }
`;

export const Diagnosis = styled.div`
  border: 1px solid #e8e8e6;
  border-radius: 10px;
  padding: 16px;
  font-size: 15px;
`;

export const SectionTitle = styled(Typography)`
  &&.MuiTypography-root {
    margin-top: 24px;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

export const FullScreenContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
