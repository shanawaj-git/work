import styled from 'styled-components';
import { colorSelector } from 'themes';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  color: ${colorSelector('c200')};
  box-shadow: 0px 12px 14px rgba(0, 0, 0, 0.04),
    0px 3.67944px 16.9464px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid ${colorSelector('c600')};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;

  > p.MuiTypography-root.collapsible-header-label {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    padding-left: 10px;
    color: ${colorSelector('p500')};
  }

  > p.text-align-right {
    margin-left: auto;
    text-align: right;
    font-style: normal;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
  }

  > p.MuiTypography-root.collapsible-header-value {
    font-weight: 600;
    color: ${colorSelector('p500')};
  }

  > p.MuiTypography-root.collapsible-header-placeholder {
    font-weight: 500;
    color: ${colorSelector('c500')};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  width: 34px;
  height: 34px;
  background: ${colorSelector('c100')};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled.img`
  max-width: 24px;
  max-height: 24px;
`;
