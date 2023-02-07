import styled from 'styled-components';
import { colorSelector } from 'themes';
import { AccordionSummary, Accordion, AccordionDetails } from '@mui/material';
import { Typography } from '@albathanext/design-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f6fafb;
  width: 100%;
  white-space: pre-wrap;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const StyledAccordion = styled(Accordion)`
  &.MuiAccordion-root {
    box-shadow: none;
    width: 100%;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  &.MuiAccordionSummary-root {
    background: #f6fafb;
    padding: 0px;
    display: flex;
    justify-content: flex-start;

    .MuiAccordionSummary-content {
      flex-grow: 0;
      margin-right: 10px;
    }
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  &.MuiAccordionDetails-root {
    background-color: #f6fafb;
    padding: 0px;
  }
`;

export const StyledSpan = styled.span`
  display: inline-flex;
  margin-top: 5px;
  justify-content: space-between;

  >p: first-child {
    > span {
      display: inline-block;
      width: max-content;
    }
  }
`;

export const Title = styled(Typography)`
  &&.MuiTypography-root {
    font-weight: bold;
    margin-top: 5px;
  }
`;
