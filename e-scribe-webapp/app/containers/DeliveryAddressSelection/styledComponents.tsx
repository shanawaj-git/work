import styled from 'styled-components';
import { colorSelector } from 'themes';
import { Typography } from '@albathanext/design-system';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 0 0 auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  min-height: 400px;
  flex-direction: column;
  padding: 0px 18px;
  max-width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 48px;
  justify-content: flex-start;
  align-items: fles-start;
  flex-direction: column;
  width: 100%;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .btnAddNew {
    margin-top: 16px;
    width: 221px;
    height: 46px;
    text-transform: none !important;
    font-weight: 600 !important;
    font-size: 17px !important;
    line-height: 22px !important;
    letter-spacing: -0.408px !important;
    font-style: normal !important;
  }
`;

export const DeliveryTitle = styled(Typography)`
  margin-top: 200px !important;
  font-weight: 700 !important;
  letter-spacing: 0.35px !important;
  text-align: center;
  white-space: pre-line;
  color: ${colorSelector('font-primary')};
`;

export const DeliveryDescription = styled(Typography)`
  margin-top: 16px !important;
  font-weight: 400 !important;
  font-size: 15px !important;
  line-height: 20px !important;
  text-align: center;
  letter-spacing: -0.24px !important;
  white-space: pre-line;
  color: ${colorSelector('font-primary')};
`;
