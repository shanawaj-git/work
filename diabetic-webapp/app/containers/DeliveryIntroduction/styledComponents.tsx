import styled from 'styled-components';
import { Typography } from '@albathanext/design-system';

export const DeliveryNoteScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  padding: 0px 18px;
  align-items: center;
`;
export const DeliveryNoteDescription = styled.div`
  align-self: start;
`;

export const DeliveryNoteHeader = styled.div`
  display: inline-block;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  align-self: start;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  .MuiButton-root {
    border-radius: 12px;
    width: 100%;
  }
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.4px;
`;

export const ClickHereLink = styled(Typography)`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #12a1c0;
  width: 100%;
  padding-bottom: 5%;
`;

export const DeliveryStepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DeliveryStepImageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: #ebebe8;
  border: 1px solid #d4d9d9;
  border-radius: 12px;
`;
export const DeliveryStepTextContainer = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px;
  margin-right: 16px;
`;
export const StepTitle = styled(Typography)`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.6px;
  color: #00664f;
  font-weight: bold;
`;
export const StepDescription = styled(Typography)`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #495151;
  align-self: stretch;
  width: 211px;
`;
export const Margin = styled.div`
  width: 80%;
  border: 1px solid #d4d9d9;
  align-items: center;
`;

export const DeliveryDescription = styled(Typography)`
  width: 327px;
  height: 66px;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #495151;
`;

export const DeliveryHeaderLabel = styled(Typography)`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-size: 32px;
  line-height: 36px;
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: 36px;
  color: #020a0a;
`;
export const DeliveryHeaderSuffixLabel = styled(Typography)`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-size: 36px;
  line-height: 36px;
  font-weight: 500;
  letter-spacing: 0.6px;
  line-height: 36px;
  color: #020a0a;
`;
