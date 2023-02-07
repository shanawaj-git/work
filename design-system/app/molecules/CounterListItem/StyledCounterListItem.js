import styled from 'styled-components';
import { colorSelector } from 'themes';
import { CounterListItemComponent } from './CounterListItemComponent';

export const StyledCounterListItem = styled(CounterListItemComponent)`
  .item-wrapper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px ${colorSelector('c300')} solid;
  }

  .image {
    border: 0.333333px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 80px;
    heigth: 80px;
    display: flex;

    img {
      width: 64x;
      heigth: 64px;
      margin: auto;
    }
  }

  .item-details {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: auto;
  }

  .cart-buttons {
    margin-left: auto;
    display: flex;

    span {
      margin: auto;
    }

    button {
      border: 1.5px solid ${colorSelector('fontSecondary')};
      border-radius: 50%;
      height: 18px;
      width: 18px;
      margin-left: 11px;
      margin-right: 11px;
      background: none;
      line-height: 1px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .add-button {
      color: ${colorSelector('c100')};
      border: 1.5px solid ${colorSelector('c100')};
    }
  }
`;
