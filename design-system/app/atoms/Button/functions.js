import { sizeStyles, styles } from './styles';

const AVAILABLE_SIZES = Object.keys(sizeStyles);
const AVAILABLE_COLORSTYLES = Object.keys(styles);

const getStyleValue = (
  props,
  attribute,
  internalState,
  propKey = 'colorStyle',
  stylesObj = styles,
) => {
  let style = stylesObj[props[propKey]];
  if (style) {
    if (typeof style === 'function') {
      style = style(props);
    }

    if (internalState) {
      return getStyleProperies(style, internalState, attribute);
    }

    const styleValue = style[attribute];

    return styleValue;
  }
  return '';
};

export { AVAILABLE_SIZES, AVAILABLE_COLORSTYLES, getStyleValue };

export const getStyleProperies = (style, internalState, attribute) =>
  style[internalState] && style[internalState][attribute] !== undefined
    ? style[internalState][attribute]
    : style[attribute];

export const selectSpinnerVariant = buttonVariant =>
  buttonVariant === 'contained' ? 'light' : 'dark';
