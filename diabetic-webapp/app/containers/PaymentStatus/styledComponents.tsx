import styled from 'styled-components';
import { Typography } from '@mui/material';
export const HeaderImage = styled.div`
  direction: rtl;
`;

export const PaymentStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  min-height: 100vh;
  min-width: 100%;
`;

export const PaymentStatusContent = styled.div`
  margin: 20px 20px 20px 20px;
`;
export const PaymentHeader = styled.div`
  display: block;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;

export const PaymentStatusDescription = styled.div`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  color: #495151;
  margin: 20px 0px 20px 0px;
  a {
    color: #12a1c0;
    font-style: normal;
  }
`;

export const PaymentDetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  color: black;
  margin: 20px 0px 20px 0px;
`;

export const PaymentRowDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  margin-left: 16px;

  .MuiTypography-h2 {
    font-size: 15px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;

    line-height: 22px;
    letter-spacing: 0.3px;
    color: #020a0a;
  }

  .MuiTypography-subtitle1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: rgba(83, 88, 87, 0.87);
  }
`;

export const PaymentDetailContainer = styled.div`
  margin-top: 38px;
`;
export const PaidToLogo = styled.img`
  width: 42px;
  height: 32px;
`;
export const PaymentMethodLogoImage = styled.img`
  width: 42px;
  height: 32px;
`;

export const PaymentMethodHeader = styled(Typography)`
  width: 100%;
  height: 22px;
`;

export const PaymentMethodSubHeading = styled(Typography)`
  width: 100%;
  height: 22px;
  margin-top: 4px;
`;
export const RetryPaymentButton = styled.button`
  color: white;
  margin-left: 20px;
  margin-right: 20px;
  position: absolute;
  bottom: 100px;
  height: 48px;
  width: 90%;
  /* BG/Primary */
  background: #00664f;
  border-radius: 12px;
`;
