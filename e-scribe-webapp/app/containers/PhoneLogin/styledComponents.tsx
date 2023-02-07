import styled from 'styled-components';
import { Input } from '@albathanext/design-system';

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
`;

export const StyledInput = styled(Input)`
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
    }
  }

  .MuiInputLabel-root {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-bottom: 24px;
`;

export const ErrorText = styled.div`
  width: 100%;
  color: #ed2c25;
`;
