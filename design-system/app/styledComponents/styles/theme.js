import { css } from 'styled-components';

import { FONTS } from './fonts';
import * as viewports from '../../constants/viewports';

const color = Object.freeze({
  p100: '#FAC2B3',
  p200: '#F6947A',
  p300: '#F26641',
  p400: '#CE5737',

  a100: '#FFE0BC',
  a200: '#FFC889',
  a300: '#F5AB56',
  a400: '#F99727',

  b100: '#C4F8CC',
  b200: '#93E8A1',
  b300: '#70D280',
  b400: '#44C058',

  c100: '#B9D9FD',
  c200: '#84B7F1',
  c300: '#2575CD',
  c400: '#5E9EE6',

  d100: '#AAE4FB',
  d200: '#87D4F3',
  d300: '#5EC0E7',
  d400: '#3FA9D3',

  g100: '#F6F6F8',
  g200: '#DFE4ED',
  g300: '#D0D0D8',
  g400: '#7B7B8E',
  g500: '#13171C',
  g600: '#F2F2F7',

  fontPrimary: '#3A3A3A',
  fontSecondary: '#9A9D9D',
  'font-tertiary': '#3C3C43CC',

  white: '#FFFFFF',
  black: '#000000',
  error1: '#FFE4E4',
  error2: '#FD9490',
  error3: '#FA605A',
  error4: '#ED2C25',
});

const typo = Object.freeze(
  Object.keys(FONTS).reduce((acc, key) => {
    acc[key] = css`
      font-size: ${FONTS[key].fontSize};
      font-family: ${FONTS[key].fontFamily};
      line-height: ${FONTS[key].lineHeight};
    `;

    return acc;
  }, {}),
);

const typoSelector = typoKey => props => props.theme.typo[typoKey];

const fontWeight = Object.freeze({
  book: css`
    font-weight: 400;
  `,
  medium: css`
    font-weight: 500;
  `,
  demi: css`
    font-weight: 600;
  `,
  bold: css`
    font-weight: 700;
  `,
});

const boxShadowFocus = css`
  &:focus {
    box-shadow: 0px 0px 10px ${color.d100};
  }
`;

const boxShadow = Object.freeze({
  level1: css`
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.07);
  `,
  level2: css`
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.07);
  `,
  level3: css`
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.07);
  `,
  level4: css`
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.1);
  `,
  level5: css`
    box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.15);
  `,
  focus: css`
    box-shadow: 0px 0px 10px ${color.d100};
  `,
});

const border = Object.freeze({
  level1: '0.3px solid rgba(130, 130, 130, 0.5)',
});

const layer = Object.freeze({
  hidden: -1,
  select: 5,
  newQuoteButton: 45,
  navbar: 50,
  tooltip: 60,
  mobileSocialFooter: 70,
  popup: 90,
  modal: 100,
  slideOut: 1101,
  welcomeModal: 1301,
});

// https://material-ui.com/customization/default-theme/?expend-path=$.breakpoints.values
const breakpoint = Object.freeze({
  // this prop is needed because webapp/imports/styledComponents/Grid/Column.js uses xs viewport
  xs: 0,
  sm: 0,
  md: viewports.tablet.width,
  lg: viewports.desktop.width,
});

// https://getbootstrap.com/docs/4.3/layout/overview/
const query = {
  min: {
    solve: width => `(min-width: ${width}px)`,
    tablet: `(min-width: ${breakpoint.md}px)`,
  },
  max: {
    solve: width => `(max-width: ${width - 0.02}px)`,
    tablet: `(max-width: ${breakpoint.lg - 0.02}px)`,
  },
  mobile: `(max-width: ${breakpoint.md - 0.02}px)`,
  tablet: `(min-width: ${breakpoint.md}px) and (max-width: ${breakpoint.lg -
    0.02}px)`,
  desktop: `(min-width: ${breakpoint.lg}px)`,
  dpr2x: `(min-resolution: 2dppx), (min-resolution: 192dpi)`,
  mobileDpr2x: `(max-width: ${breakpoint.md -
    0.02}px) and (min-resolution: 2dppx), (max-width: ${breakpoint.md -
    0.02}px) and (min-resolution: 192dpi)`,
};

Object.keys(breakpoint).forEach(key => {
  query.min[key] = query.min.solve(breakpoint[key]);
  query.max[key] = query.max.solve(breakpoint[key]);
});

Object.freeze(query);
Object.freeze(query.min);
Object.freeze(query.max);

const defaultTheme = Object.freeze({
  color,
  typo,
  border,
  boxShadow,
  boxShadowFocus,
  layer,
  breakpoint,
  query,
  fontWeight,
});

export {
  color,
  typo,
  border,
  boxShadow,
  boxShadowFocus,
  layer,
  breakpoint,
  query,
  fontWeight,
  typoSelector,
};

export default defaultTheme;
