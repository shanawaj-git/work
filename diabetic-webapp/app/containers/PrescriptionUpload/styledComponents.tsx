import styled from 'styled-components';

export const UploadPrescriptionImage = styled.div`
  direction: rtl;
`;
export const UploadPrescription = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 100vh;
  min-width: 100%;
  position: fixed;
`;

export const UploadPrescriptionHeader = styled.div`
  display: block;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;

export const UploadPrescriptionDescription = styled.div`
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  color: black;
  margin: 20px 0px 20px 0px;
`;

export const PrescriptionContent = styled.div`
  margin: 20px 20px 20px 20px;
`;
export const PrescriptionUploadButton = styled.button`
  color: white;
  position: absolute;
  bottom: 100px;
  height: 48px;
  width: 90%;
  /* BG/Primary */
  background: #00664f;
  border-radius: 12px;
`;

export const PrescriptionInput = styled.input`
  display: none;
`;
