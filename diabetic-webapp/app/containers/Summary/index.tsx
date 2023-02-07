import React from 'react';
import { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Typography, TypographyType } from '@albathanext/design-system';
import {
  Container,
  Description,
  HeaderDescription,
  HeaderImage,
  HeaderImageContainer,
} from './styledComponents';
import messages from './messages';
const education3 = require('images/educationImage3.svg');

function Summary({ intl }: SummaryScreenTypes) {
  return (
    <Container>
      <HeaderImageContainer>
        <HeaderImage src={education3} alt="header-img" />
      </HeaderImageContainer>
      <Description>
        <HeaderDescription>
          <Typography typographyType={TypographyType.TITLE_1}>
            {intl.formatMessage(messages.headingTitlePrefixLabel)}
          </Typography>
          <Typography
            typographyType={TypographyType.LARGE_TITLE}
            className="suffix-title"
          >
            {intl.formatMessage(messages.headingTitleSuffixLabel)}
          </Typography>
        </HeaderDescription>
        <Typography typographyType={TypographyType.SUBTITLE_1}>
          {intl.formatMessage(messages.descriptionLabel)}
        </Typography>
        <Typography
          typographyType={TypographyType.SUBTITLE_1}
          className="bold-text"
        >
          {intl.formatMessage(messages.boldDescriptionLabel)}
        </Typography>
      </Description>
    </Container>
  );
}
const SummaryScreenPropTypes = {
  intl: any,
};

type SummaryScreenTypes = InferProps<typeof SummaryScreenPropTypes>;

Summary.prototype = SummaryScreenPropTypes;

export default injectIntl(Summary);
