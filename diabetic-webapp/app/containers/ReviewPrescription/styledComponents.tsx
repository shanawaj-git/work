import styled from 'styled-components';
export const PrescriptionPreview = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  align-items: center;
  justify-content: center;
  height: 100%;
  //position: fixed;
`;

export const PrescriptionImage = styled.img`
  background: #fafafa;
  border-color: black;
  border-radius: 14px;
  width: 315px;
  height: 400px;
  margin-top: auto;
`;

export const PrescriptionConnfirmationNav = styled.div`
  //display: flex;
  //flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 10px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const PrescriptionConfirmationHeader = styled.div`
  display: inline-block;
  clear: both;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 10px;
`;

export const PrescriptionConfirmationDescription = styled.div`
  padding-bottom: 10px;
`;

export const PrescriptionConfirmationButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContinueButton = styled.button`
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 48%;
  height: 48px;
  background: #00664f;
  border-radius: 12px;
`;

export const RetakeButton = styled.button`
  color: black;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 48%;
  height: 48px;
  border-style: solid;
  border-width: thin;
  border-radius: 12px;
`;

export const PrescriptionPopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 10px;
  background: #fafafa;
  box-shadow: 0px -12px 43px rgba(0, 0, 0, 0.04),
    0px -3.68px 16.9464px rgba(0, 0, 0, 0.02);
  border-radius: 16px;

  bottom: 20px;
  margin-top: auto;
`;
