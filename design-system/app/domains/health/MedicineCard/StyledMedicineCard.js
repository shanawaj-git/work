import styled from 'styled-components';
import { colorSelector } from 'themes';

export const MedicineCardWrapper = styled.div`
  border: 1px solid ${colorSelector('c300')};
  padding: 16px;
  border-radius: 10px;

  .medicine-card-header {
    display: flex;

    img {
      width: 56px;
      height: 56px;
    }

    .card-header-title {
      color: #12121d;
      font-weight: 600;
    }

    .card-header-subTitle {
      color: ${colorSelector('fontPrimary')};
    }
  }

  .medicine-card-details-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 15px;

    .card-header-subTitle {
      margin-top: 10px;
    }

    .card-header-description {
      color: ${colorSelector('p300')};
    }
  }

  .medicine-card-body {
    background: ${colorSelector('p200')};
    padding: 16px;
    margin-top: 16px;
    border-radius: 16px;
    color: #4c516a;
    line-height: 3;
  }
`;
