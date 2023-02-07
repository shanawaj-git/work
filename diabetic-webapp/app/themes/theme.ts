export const APP_THEME_NAME = 'Diabetic';
const PRIMARY_COLOR = '#00664F';
const SECOUNDRY_COLOR = '#050C09';
export const diabeticTheme = {
  color: {
    c100: PRIMARY_COLOR,
    c200: '#FFFFFF',
    c300: '#E8E8E6',
    c400: '#9A9D9D',
    c500: '#FAFAF7',
    c600: '#d4d9d9',
    c700: '#12a1c0',
    p100: '#F6FAFB',
    p200: '#12A1C0',
    p300: PRIMARY_COLOR,
    p400: '#FAFAFA',
    p500: '#020A0A',
    p600: SECOUNDRY_COLOR,
    p700: '#1F2222',
  },
  overrides: {
    button: {
      backgroundColor: PRIMARY_COLOR,
      borderRadius: '1px',
      color: SECOUNDRY_COLOR,
    },
  },
};
