import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';

import CardBody from 'molecules/Card/CardBody';
import {
  StyledCardHeader,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledCardFooter,
  StyledDivider,
  PriceSummary,
  Container,
} from './styledComponents';

export const PharmacyCard = props => {
  const { bodyDetails, bodySummary, footerDetails, expanded, disabled } = props;
  const [isExpanded, setExpanded] = React.useState(expanded);

  const toggleSeperator = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <StyledAccordion
        onChange={toggleSeperator}
        expanded={isExpanded}
        disabled={disabled}
      >
        <StyledAccordionSummary>
          <StyledCardHeader {...props} />
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <CardBody details={bodyDetails} />
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledDivider />
      <Container>
        {isExpanded &&
          bodySummary &&
          bodySummary.map(footerDetail => {
            const { text, sideText } = footerDetail;
            return (
              <PriceSummary text={text} key={uuidV4()} sideText={sideText} />
            );
          })}
      </Container>

      <StyledCardFooter details={footerDetails} shouldShowButton={isExpanded} />
    </>
  );
};

PharmacyCard.propTypes = {
  bodyDetails: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      sideText: PropTypes.string,
    }),
  ),
  bodySummary: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      sideText: PropTypes.string,
    }),
  ),
  footerDetails: PropTypes.shape({
    buttonText: PropTypes.string,
    titleText: PropTypes.string,
    titleSideText: PropTypes.string,
    caption: PropTypes.string,
  }),
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
};
