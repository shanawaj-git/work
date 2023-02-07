import { merge } from 'lodash';
import { Organization, SETTINGS } from '../config/organizations';
import { defaultTheme } from '../styledComponents/styles';
import { GlobalTheme } from '../utils/globalTheme';

// import { LOGOS } from './logos';

const getOrganizationSettings = organization => {
  const THEMES = {
    ...SETTINGS,
    ...GlobalTheme.getDynamicThemes(),
  };
  if (!THEMES[organization]) {
    console.error(
      "ERROR : Theme name provided deosn't exists in the design system. ",
    );
  }
  const settings = THEMES[organization] || THEMES[Organization.DEFAULT];
  return {
    ...settings,
    // logo,
    theme: merge({}, defaultTheme, settings.theme),
  };
};

export { getOrganizationSettings };
