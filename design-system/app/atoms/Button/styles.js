import { get } from 'lodash';
import { FONTS } from 'styledComponents/styles';

import { boxShadowSelector, colorSelector } from 'themes';

export const defaultRootStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Poppins',
  fontWeight: 'demi',
};

export const defaultTextStyle = {
  padding: '8px 16px',
};

export const defaultLabelStyle = {
  textTransform: 'none',
  paddingLeft: '6px',
  paddingRight: '6px',
};

const primaryStyle = props => ({
  color: get(props, 'theme.overrides.button.color', colorSelector('white')),
  backgroundColor: get(
    props,
    'theme.overrides.button.backgroundColor',
    colorSelector('P300'),
  ),
  borderRadius: get(props, 'theme.overrides.button.borderRadius', '32px'),
  borderWidth: '0',
  textTransform: 'capitalize',
  boxShadow: 'none',
  hover: {
    backgroundColor: get(
      props,
      'theme.overrides.button.backgroundColor',
      colorSelector('P300'),
    ),
    color: get(props, 'theme.overrides.button.color', colorSelector('white')),
  },
  active: {
    color: get(props, 'theme.overrides.button.color', colorSelector('P300')),
    backgroundColor: colorSelector('P300'),
  },
  disabled: {
    color: colorSelector('C200'),
    backgroundColor: `${colorSelector('P300')}7F`,
  },
  loading: {
    backgroundColor: colorSelector('P400'),
  },
});

export const styles = {
  default: primaryStyle,
  primary: primaryStyle,
  secondary: props => ({
    color: get(props, 'theme.overrides.button.color', colorSelector('P300')),
    backgroundColor: colorSelector('transparent'),
    borderWidth: '2px',
    borderRadius: get(props, 'theme.overrides.button.borderRadius', '32px'),
    borderColor: colorSelector('P300'),
    borderStyle: 'solid',
    textTransform: 'capitalize',
    hover: {
      backgroundColor: colorSelector('P300'),
      boxShadow: boxShadowSelector('level2'),
      color: get(props, 'theme.overrides.button.color', colorSelector('white')),
    },
    active: {
      color: get(props, 'theme.overrides.button.color', colorSelector('white')),
      backgroundColor: colorSelector('P400'),
    },
    disabled: {
      color: colorSelector('C400'),
      backgroundColor: colorSelector('G200'),
      borderStyle: 'none',
    },
    loading: {
      color: get(props, 'theme.overrides.button.color', colorSelector('white')),
      backgroundColor: colorSelector('P400'),
    },
  }),
  ghost: {
    color: colorSelector('P300'),
    backgroundColor: 'transparent',
    borderWidth: 0,
    hover: {
      color: colorSelector('P400'),
      backgroundColor: 'transparent',
    },
    active: {
      color: colorSelector('P400'),
      backgroundColor: 'transparent',
    },
    disabled: {
      color: colorSelector('G400'),
      backgroundColor: 'transparent',
    },
    loading: {
      color: colorSelector('P400'),
      backgroundColor: 'transparent',
    },
  },
  ghostSecondary: {
    color: colorSelector('G400'),
    backgroundColor: 'transparent',
    borderWidth: 0,
    hover: {
      color: colorSelector('G400'),
      backgroundColor: 'transparent',
    },
    active: {
      color: colorSelector('G400'),
      backgroundColor: 'transparent',
    },
    disabled: {
      color: colorSelector('G400'),
      backgroundColor: 'transparent',
    },
    loading: {
      color: colorSelector('G400'),
      backgroundColor: 'transparent',
    },
  },
  alert: {
    color: colorSelector('white'),
    backgroundColor: colorSelector('G500'),
    hover: {
      boxShadow: boxShadowSelector('level2'),
      backgroundColor: colorSelector('G500'),
    },
    active: {
      backgroundColor: colorSelector('G500'),
    },
    disabled: {
      color: colorSelector('G400'),
      backgroundColor: colorSelector('G200'),
    },
    loading: {},
  },
};

export const sizeStyles = {
  default: () => ({
    height: '50px',
    width: '140px',
    fontSize: FONTS.bodyM.fontSize,
    lineHeight: FONTS.bodyM.lineHeight,
    padding: 0,
    textPadding: defaultTextStyle.padding,
    labelPaddingLeft: defaultLabelStyle.paddingLeft,
    labelPaddingRight: defaultLabelStyle.paddingRight,
  }),
  ghost: {
    height: 'fit-content',
    width: 'fit-content',
    fontSize: FONTS.bodyM.fontSize,
    lineHeight: FONTS.bodyM.lineHeight,
    borderRadius: '0',
    padding: '0',
    textPadding: '0',
    labelPaddingLeft: '0',
    labelPaddingRight: '0',
  },
  icon: {
    height: '50px',
    width: '50px',
    fontSize: FONTS.bodyS.fontSize,
    lineHeight: FONTS.bodyS.lineHeight,
    borderRadius: '25px',
    padding: 0,
    textPadding: '8px',
    labelPaddingLeft: '0',
    labelPaddingRight: '0',
  },
  small: () => ({
    height: '40px',
    width: '100px',
    fontSize: FONTS.bodyS.fontSize,
    lineHeight: FONTS.bodyS.lineHeight,
    padding: 0,
    textPadding: defaultTextStyle.padding,
    labelPaddingLeft: defaultLabelStyle.paddingLeft,
    labelPaddingRight: defaultLabelStyle.paddingRight,
  }),
  medium: () => ({
    height: '50px',
    width: '140px',
    fontSize: FONTS.bodyM.fontSize,
    lineHeight: FONTS.bodyM.lineHeight,
    padding: 0,
    textPadding: defaultTextStyle.padding,
    labelPaddingLeft: defaultLabelStyle.paddingLeft,
    labelPaddingRight: defaultLabelStyle.paddingRight,
  }),
  large: () => ({
    height: '60px',
    width: '200px',
    fontSize: FONTS.bodyL.fontSize,
    lineHeight: FONTS.bodyL.lineHeight,
    padding: 0,
    textPadding: defaultTextStyle.padding,
    labelPaddingLeft: defaultLabelStyle.paddingLeft,
    labelPaddingRight: defaultLabelStyle.paddingRight,
  }),
};

/**
 * Based on Material-ui CircularProgress attributes
 */
export const buttonLoadingStyles = {
  default: {
    inlineStyle: {
      position: 'inherit',
      color: '#FFFFFF',
    },
    size: 18,
    thickness: 7,
  },
  ghost: {
    inlineStyle: {
      position: 'inherit',
      color: colorSelector('P300'),
    },
    size: 18,
    thickness: 7,
  },
};
