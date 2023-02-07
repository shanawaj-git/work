import styled from 'styled-components';
import { colorSelector } from 'themes';
import { ListItemComponent } from './ListItemComponent';

export const StyledListItem = styled(ListItemComponent)`
  .text-list-item-wrapper {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: 0.5px solid #c6c6c8;
    padding-bottom: 11px;
    padding-right: 16px;

    .list-item-input {
      margin-left: auto;
      padding-right: 5px;
    }

    img {
      width: 14px;
    }
  }

  .MuiTypography-root.MuiTypography-h5 {
    font-weight: 400;
  }

  .text-list-item-left {
    color: #e25f6d;
  }

  .text-list-item-muted {
    color: ${colorSelector('fontSecondary')};
  }

  .MuiInputBase-root.MuiInput-root {
    direction: rtl;

    ::before,
    ::after {
      border-bottom: none;
    }

    :hover:not(Mui-disabled):before {
      border-bottom: none;
    }
  }

  .MuiInputBase-input {
    padding-bottom: 0;
    caret-color: #e25f6d;

    ::placeholder {
      color: ${colorSelector('fontSecondary')};
    }

    :focus::placeholder {
      opacity: 0;
    }
  }
`;
