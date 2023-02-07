import styled from 'styled-components';
import { colorSelector } from 'themes';
import { RadioListComponent } from './RadioListComponent';

export const StyledRadioList = styled(RadioListComponent)`
  .radio-list-item {
    margin-bottom: 48px;
    background: ${colorSelector('white')};
    border-radius: 10px;
    box-shadow: 0px 3px 20px rgba(96, 108, 116, 0.13);
    padding: 24px 16px;
    display: flex;
    flex: 1;
    margin-right: auto;
    width: 100%;
    justify-content: space-between;
  }

  .radio-list-item.active {
    margin-bottom: 48px;
    background: ${colorSelector('white')};
    border-radius: 10px;
    box-shadow: 0px 3px 20px rgba(96, 108, 116, 0.13);
    padding: 24px 16px;
    display: flex;
    flex: 1;
    margin-right: auto;
    width: 100%;
    justify-content: space-between;
    border: 1px solid ${colorSelector('c100')};
  }

  .MuiRadio-root {
    margin-left: 65px;
  }

  .Mui-disabled {
    .checked-icon,
    .unchecked-icon {
      border: 1px solid ${colorSelector('g600')};
    }

    .checked-icon {
      &:before {
        display: block;
        margin: auto;
        width: 32px;
        height: 32px;
        content: '';
        border-radius: 50%;
        background-color: ${colorSelector('g600')};
      }
    }
  }
  .unchecked-icon {
    border-radius: 50%;
    border: 1px solid ${colorSelector('c100')};
    width: 36px;
    height: 36px;
    background-color: ${colorSelector('p200')};
    .Mui-focusVisible & {
      outline: 2px auto rgba(19, 124, 189, 0.6);
      outline-offset: 2;
    }
    input:hover ~ & {
      background-color: #30404d;
    }
  }

  .checked-icon {
    border-radius: 50%;
    border: 1px solid ${colorSelector('c100')};
    width: 36px;
    height: 36px;
    display: flex;
    &:before {
      display: block;
      margin: auto;
      width: 32px;
      height: 32px;
      content: '';
      background-color: ${colorSelector('c100')};
      border-radius: 50%;
    }
    input:hover ~ & {
      background-color: #106ba3;
    }
  }
`;
