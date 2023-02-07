import { Typography } from '@albathanext/design-system';
import styled from 'styled-components';

export const DeliveryModalHeaderLabel = styled(Typography)`
  &.MuiTypography-root {
    font-style: normal !important;
  }
  &.MuiTypography-h2 {
    font-weight: 500;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0.6px;
    font-style: normal;
    padding-bottom: 5px;
    padding-top: 30px;
    color: #020A0A;
`;

export const DeliveryModalHeaderSuffixLabel = styled(Typography)`
  &.MuiTypography-h1 {
    font-weight: 500;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0.6px;
    font-style: normal;
    letter-spacing: 0.3px;
    padding-bottom: 7px;
  }
`;

export const DeliveryModalDescription = styled(Typography)`
  &.MuiTypography-body1 {
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #495151;
  }
`;

export const ModalCompo = styled.div`
  .react-responsive-modal-modal {
    max-width: 100%;
  }
`;
