// eslint-disable-next-line import/no-cycle
import { GlobalTheme } from '../utils/globalTheme';
import { getOrganizationSettings } from '../organizations';

const getTheme = () => {
  const themeAlias = GlobalTheme.getTheme();

  return getOrganizationSettings(themeAlias);
};

export { getTheme };
