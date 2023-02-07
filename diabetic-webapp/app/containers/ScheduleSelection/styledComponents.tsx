import styled from 'styled-components';
import { Typography } from '@albathanext/design-system';
import { colorSelector } from '../../themes';

export const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  min-height: 400px;
  flex-direction: column;
  padding: 0px 18px;
  width: 100%;
  height: calc(100% - 48px);
  div.collapsible-header-icon {
    background-color: ${colorSelector('c100')};
  }
`;

export const Title2 = styled(Typography)`
  font-weight: bold !important;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 24px !important;

  color: #020a0a;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  row-gap: 8px;
  margin-bottom: 48px;
  overflow-y: auto;
`;

export const MpcLogo = styled.img`
  position: absolute;
  width: 54px;
  height: 45px;
  left: 82%;
  top: 2%;
`;

export const ScheduleSelectionHeader = styled.div`
  width: 327px;
  height: 72px;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.6px;
  color: #020a0a;
  padding-bottom: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 48px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px 24px;
  gap: 12px;

  position: absolute;
  width: 100%;
  height: 84px;
  left: 0px;
  bottom: 0px;

  /* BG/off white */

  background: #fafafa;
  /* S2 */

  box-shadow: 0px -12px 43px rgba(0, 0, 0, 0.04),
    0px -3.68px 16.9464px rgba(0, 0, 0, 0.02);
  border-radius: 0px;

  button.MuiButton-root {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
  }
`;

export const ErrorText = styled.div`
  width: 100%;
  color: #ed2c25;
`;
