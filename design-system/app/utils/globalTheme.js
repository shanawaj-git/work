// eslint-disable-next-line import/no-cycle
import { getTheme } from 'themes/getTheme';
import { SETTINGS } from '../config/organizations';

let currentTheme = 'DEFAULT';
const newThemes = {};

const validateTheme = type => {
  if (!SETTINGS[type])
    throw new Error('ERROR : Theme name provided is not defined');
};

class Theme {
  getInstance() {
    return this;
  }

  getTheme() {
    return currentTheme;
  }

  getDynamicThemes() {
    return newThemes;
  }

  setTheme(theme) {
    if (typeof theme === 'string') {
      validateTheme(theme);
      currentTheme = theme;
    } else {
      newThemes[theme.name] = theme;
      currentTheme = theme.name;
    }
  }

  getActiveTheme() {
    return getTheme();
  }
}
export const GlobalTheme = new Theme();
