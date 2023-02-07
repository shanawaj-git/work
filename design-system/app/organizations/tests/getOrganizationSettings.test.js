import { getOrganizationSettings } from '../getOrganizationSettings';

describe('getOrganizationSettings', () => {
  it('should return organization settings if it exists', () => {
    expect(getOrganizationSettings('DEFAULT')).toMatchSnapshot();
  });

  it('should return default settings if it exists', () => {
    expect(getOrganizationSettings('UNKNOWN')).toMatchSnapshot();
  });
});
