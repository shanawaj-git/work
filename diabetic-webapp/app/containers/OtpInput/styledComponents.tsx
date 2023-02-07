import styled from 'styled-components';
import { Input, Typography } from '@albathanext/design-system';
import { colorSelector } from 'themes';

export const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  padding: 0px 18px;
  max-width: 100%;
  .spacing {
    margin: 16px 0px;
  }
  .btn-container {
    width: 100%;
    padding-bottom: 24px;
    .MuiButton-root {
      border-radius: 12px;
    }
  }
  .btn-container > button {
    width: 100%;
  }
  .inline {
    display: inline;
  }
  .resend-link-text {
    display: inline;
    font-weight: bold;
  }
  .link-resendOtp {
    padding-top: 10px;
  }
`;

export const MpcLogo = styled.img`
  position: absolute;
  width: 54px;
  height: 45px;
  left: 82%;
  top: 2%;
`;

export const OtpInputLoginHeader = styled.div`
  width: 327px;
  height: 72px;

  /* Headline 1 Regular */

  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  /* or 112% */

  letter-spacing: 0.6px;

  /* Front/Primary */

  color: #020a0a;
  padding-bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 48px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const OtpInput = styled(Input)`
  label {
    width: 102px;
    height: 22px;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #020a0a;
  }
  &&.MuiFormControl-root {
    width: 100%;
  }
  .MuiInput-root {
    margin-bottom: 10px;
    width: 100%;
    input {
      width: 100%;
      border-color: #12a1c0;
      caret-color: #12a1c0;
      apperance: none;
      margin-bottom: 20px;
    }
  }
  .MuiInputLabel-root {
    width: 100%;
    white-space: normal;
  }
`;

export const OtpInputDescription = styled(Typography)`
  padding-top: 8px;
`;

export const ErrorText = styled.div`
  width: 100%;
  color: #ed2c25;
`;

export const LinkText = styled.span`
  color: ${colorSelector('c100')};
  text-decoration: underline;
  font-weight: bold;
  display: inline;
`;
