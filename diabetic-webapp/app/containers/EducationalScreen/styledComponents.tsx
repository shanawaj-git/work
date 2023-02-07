import styled from 'styled-components';
import { Carousel } from '@albathanext/design-system';

export const CarouselImage = styled.div`
  direction: rtl;
`;

export const CarouselHeader = styled.div`
  display: block;
  padding: 10px 30px;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
`;

export const CarouselDescription = styled.div`
  padding: 10px 30px;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #495151;
`;

export const CarouselNextButton = styled.button`
  pointer-events: all;
  margin-top: 60px;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  width: 159.5px;
  height: 48px;
  /* BG/Primary */
  background: #00664f;
  border-radius: 12px;
  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 1;
`;

export const CarouselSkipButton = styled.button`
  pointer-events: all;
  margin-top: 60px;
  border-width: 0;
  font-family: 'system-ui';
  text-decoration: underline;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.4px;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const EducationalCarousel = styled(Carousel)`
  display: flex;
  flex-direction: column;

  menu,
  ol,
  ul {
    padding: 0px 10px;
    list-style-image: url("data:image/svg+xml,%3Csvg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle opacity='.2' cx='7' cy='7' r='7' fill='%2312A1C0'/%3E%3Ccircle cx='7' cy='7' r='3' fill='%2312A1C0'/%3E%3C/svg%3E");
    font-family: 'Neue Haas Grotesk Display Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #495151;
  }

  .MuiButton-root {
    border: none;
    background: transparent !important;
    color: white !important;
    justify-content: left;
  }
  .MuiButton-root:hover {
    color: transparent;
    box-shadow: none;
  }
  .MuiMobileStepper-dots {
    margin-bottom: 40px;
    margin-left: -45vw;
  }
  .MuiMobileStepper-dot,
  .MuiMobileStepper-dot {
    width: 8px;
    height: 4px;
    /* Stroke/Inactive */
    background: #d4d9d9;
    border-radius: 10px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .MuiMobileStepper-dotActive {
    width: 53px;
    height: 4px;
    background: #12a1c0;
    border-radius: 10px;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;
