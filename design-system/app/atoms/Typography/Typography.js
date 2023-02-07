import React from 'react';
import PropTypes from 'prop-types';
import { StyledTypography } from './styledComponents';

export const TypographyType = Object.freeze({
  LARGE_TITLE: 'largeTitle',
  TITLE_1: 'title1',
  TITLE_2: 'title2',
  TITLE_3: 'title3',
  HEAD_LINE: 'headLine',
  CALL_OUT: 'callOut',
  SUB_HEAD: 'subHead',
  FOOT_NOTE: 'footNote',
  CAPTION: 'caption',
});

const mapTypographyTypeToVarient = {
  [TypographyType.LARGE_TITLE]: 'h1',
  [TypographyType.TITLE_1]: 'h2',
  [TypographyType.TITLE_2]: 'h3',
  [TypographyType.TITLE_3]: 'h4',
  [TypographyType.HEAD_LINE]: 'h5',
  [TypographyType.CALL_OUT]: 'h6',
  [TypographyType.SUB_HEAD]: 'body1',
  [TypographyType.FOOT_NOTE]: 'body2',
  [TypographyType.CAPTION]: 'caption',
};

const Typography = props => {
  const { children, typographyType, ...otherProps } = props;
  return (
    <StyledTypography
      {...otherProps}
      variant={mapTypographyTypeToVarient[typographyType]}
    >
      {children}
    </StyledTypography>
  );
};

Typography.TypographyType = TypographyType;

Typography.propTypes = {
  children: PropTypes.any.isRequired,
  typographyType: PropTypes.string,
};

export default Typography;
