import { getTheme } from './getTheme';

const BOX_SHADOW_MAPPING = {
  level1: '0px 3px 10px rgba(0, 0, 0, 0.07)',
  level2: '0px 6px 10px rgba(0, 0, 0, 0.07)',
  level3: '0px 10px 20px rgba(0, 0, 0,  0.07)',
  level4: '0px 14px 28px rgba(0, 0, 0, 0.1)',
  level5: '0px 19px 38px rgba(0, 0, 0, 0.15)',
  focus: `0px 0px 10px ${getTheme().theme.color.d100}`,
};

const boxShadowSelector = level => BOX_SHADOW_MAPPING[level];
const colorSelector = color => getTheme().theme.color[color.toLowerCase()];
export { boxShadowSelector, colorSelector };
