import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 18px;
  font-size: 13px;
  padding-bottom: 16px;
  font-weight: 400;

  img {
    padding-left: 4px;
  }

  span: last-child {
    direction: rtl;
    max-width: 55%;
  }
`;
