import styled from 'styled-components';
import { colorSelector } from 'themes';
import { Typography } from '@albathanext/design-system';

export const MainContainer = styled.div`
  display: flex;
  background-color: ${colorSelector('p400')};
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px;
  max-width: 600px;
  height: 100%;
  padding-top: 22px;
  margin: auto;
  gap: 8px;
`;
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MpcLogo = styled.img`
  display: flex;
  width: 54px;
  height: 45px;
  align-self: flex-end;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  align-items: baseline;
`;

export const TitlePrefix = styled(Typography)`
  &&.MuiTypography-root {
    font-weight: 400;
    font-size: 32px;
    line-height: 36px;
    font-style: normal;
  }
`;

export const TitleSuffix = styled(Typography)`
  &&.MuiTypography-root {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    font-style: normal;
  }
`;

export const AmountContainer = styled.div`
  display: flex;
  padding-bottom: 16px;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 24px;
`;

export const AmountLabel = styled(Typography)`
  &&.MuiTypography-root {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
  }
`;

export const AmountValue = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background: #020a0a;
  border-radius: 8px;
  &&.MuiTypography-root {
    color: #ffffff;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding-bottom: 80px;
  margin-top: auto;
  .MuiButton-root {
    background: #ffffff;
    border-radius: 8px;
  }
  > button {
    width: 100%;
    height: 60px;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .MuiButton-root:hover {
    .MuiTypography-root {
      color: #ffffff;
    }
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 100%;
  padding: 16px;

  .MuiTypography-root {
    font-family: 'Neue Haas Grotesk Display Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: ${colorSelector('p500')};
  }

  .option-icon {
    height: 24px;
    width: 26px;
  }
`;

export const ButtonLabel = styled(Typography)``;
