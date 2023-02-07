import { FONTS } from 'styledComponents/styles';

import { colorSelector } from 'themes';

export const defaultRootStyle = {
  backgroundColor: 'transparent',
};

export const defaultLabelStyle = {
  fontFamily: 'Poppins',
  fontWeight: '600',
  color: colorSelector('G400'),
  textTransform: 'capitalize',
};

export const defaultTabIndicatorStyle = {
  backgroundColor: colorSelector('P300'),
};

export const sizeStyles = {
  default: {
    fontSize: FONTS.bodyL.fontSize,
    lineHeight: FONTS.bodyL.lineHeight,
  },
  extraSmall: {
    fontSize: FONTS.bodyS.fontSize,
    lineHeight: FONTS.bodyS.lineHeight,
  },
  small: {
    fontSize: FONTS.bodyM.fontSize,
    lineHeight: FONTS.bodyM.lineHeight,
  },
  medium: {
    fontSize: FONTS.bodyL.fontSize,
    lineHeight: FONTS.bodyL.lineHeight,
  },
  large: {
    fontSize: FONTS.displayM.fontSize,
    lineHeight: FONTS.displayM.lineHeight,
  },
  extraLarge: {
    fontSize: FONTS.displayL.fontSize,
    lineHeight: FONTS.displayL.lineHeight,
  },
};

export const labelStyles = {
  false: {
    color: colorSelector('p400'),
    hover: {
      color: colorSelector('p400'),
    },
  },
  true: {
    backgroundColor: colorSelector('C100'),
    borderRadius: 20,
    hover: {
      color: colorSelector('C100'),
    },
  },
};

export const tabRootStyles = {
  default: {
    minHeight: '48px',
  },
  extraSmall: {
    minWidth: '80px',
    minHeight: '48px',
  },
  small: {
    minWidth: '100px',
    minHeight: '48px',
  },
  medium: {
    minWidth: '120px',
    minHeight: '48px',
  },
  large: {
    minWidth: '140px',

    minHeight: '48px',
  },
  extraLarge: {
    minWidth: '160px',

    minHeight: '48px',
  },
};

export const tabLabelContainerStyles = {
  default: {},
  extraSmall: {
    padding: '0 8px',
  },
  small: {
    padding: '0 15px',
  },
  medium: {},
  large: {},
  extraLarge: {},
};

export const rippleStyle = {
  color: colorSelector('P300'),
};
