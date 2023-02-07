import styled from 'styled-components';
import { Input, Typography } from '@albathanext/design-system';
import { colorSelector } from 'themes';
export const Container = styled.div`
  background-color: #fafafa;
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
export const MpcLogo = styled.img`
  position: absolute;
  width: 54px;
  height: 45px;
  left: 82%;
  top: 2%;
`;

export const PhoneLoginDescription = styled(Typography)`
  padding-top: 8px;
`;
export const Wrapper = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 48px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const PhoneLoginHeader = styled.div`
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

export const StyledInput = styled(Input)`
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

export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: 24px;
  .MuiButton-root {
    border-radius: 12px;
  }
`;

export const ErrorText = styled.div`
  width: 100%;
  color: #ed2c25;
`;

export const ClickHereLink = styled(Typography)`
  color: ${colorSelector('p200')};
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  width: 22px;
`;
