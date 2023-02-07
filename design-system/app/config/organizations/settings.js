import { Organization } from './organization';
import defaultSettings from './settings/default';
import mpcSettings from './settings/mpc';
import automotiveSettings from './settings/automotive';

const ORGANIZATIONS_TO_SETTINGS_MAP = {
  [Organization.DEFAULT]: defaultSettings,
  [Organization.MPC]: mpcSettings,
  [Organization.AUTOMOTIVE]: automotiveSettings,
};

const organizationSettings = Object.keys(Organization).reduce(
  (res, organization) => {
    const baseOrganizationSettings =
      ORGANIZATIONS_TO_SETTINGS_MAP[organization];

    res[organization] = {
      ...baseOrganizationSettings,
      isDefaultOrganization: organization === Organization.DEFAULT,
    };

    return res;
  },
  {},
);

const SETTINGS = organizationSettings;

export { SETTINGS };
