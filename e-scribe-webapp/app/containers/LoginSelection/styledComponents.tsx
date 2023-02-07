import styled from 'styled-components';
import { colorSelector } from 'themes';
import { HeroSection } from '@albathanext/design-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colorSelector('c200')};
  max-height: 100vh;

  .signin-options-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    min-height: 68px;
    margin-top: 71px;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 24px;
  }

  .mobile-option-button {
    width: 100%;
    text-transform: none !important;
  }

  .orLabel {
    margin-top: 8px;
    text-align: center;
    color: ${colorSelector('font-tertiary')};
  }

  .uaepass-option-button {
    width: 100%;
    margin-top: 8px;
    border-color: #d1d5db !important;
    color: #1c1c1c !important;
    text-transform: none !important;
  }

  .uaepass-logo {
    margin-right: 11px;
  }
`;

export const StyledHeroSection = styled(HeroSection)`
  max-height: 75%;
`;
