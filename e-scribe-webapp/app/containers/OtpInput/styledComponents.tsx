import styled from 'styled-components';
import { Input } from '@albathanext/design-system';
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
`;

export const OtpInput = styled(Input)`
  &&.MuiFormControl-root {
    width: 100%;
  }
  .MuiInput-root {
    margin-bottom: 10px;
    width: 100%;
    input {
      width: 100%;
      border-color: #ed2c25;
      caret-color: #ed2c25;
      apperance: none;
      margin-bottom: 20px;
    }
  }
  .MuiInputLabel-root {
    width: 100%;
  }
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
