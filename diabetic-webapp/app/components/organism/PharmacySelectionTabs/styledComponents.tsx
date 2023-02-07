import styled from 'styled-components';
import { colorSelector } from 'themes';
import { Typography } from '@albathanext/design-system';

export const Container = styled.div`
  .tabs {
    margin-top: 30px;
  }
`;

export const ScreenTitle = styled(Typography)`
  font-weight: 700 !important;
  letter-spacing: 0.364px !important;
  color: ${colorSelector('font-primary')};
`;
