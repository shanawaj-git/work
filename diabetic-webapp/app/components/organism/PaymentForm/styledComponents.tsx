import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 24px;
  .MuiButton-root {
    border-radius: 12px;
  }
  > button {
    width: 100%;
  }
`;
