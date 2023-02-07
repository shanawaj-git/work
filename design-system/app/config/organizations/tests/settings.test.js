import { SETTINGS } from '../settings';

describe('organization settings', () => {
  it('Should return organization settings if organization exists', () => {
    expect(SETTINGS.DEFAULT).toMatchSnapshot();
  });

  it("Should return undefined object if organization doesn't exist exists", () => {
    expect(SETTINGS.UNKNOWN).toMatchSnapshot();
  });
});
