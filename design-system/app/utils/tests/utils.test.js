/**
 * Test injectors
 */

import { readableCordinates, transformedCordinates } from '../utils';

describe('utils', () => {
  it('Should return readable cordinates, by executing the lat lng function and coverting it into cordinates', () => {
    const cordinates = readableCordinates({
      lat: () => 25.194365,
      lng: () => 55.241362,
    });
    const toMatch = { lat: 25.194365, lng: 55.241362 };

    expect(cordinates).toMatchObject(toMatch);
  });

  it('Should return transformed cordinates, by executing the lat lng function and coverting it into cordinates', () => {
    const cordinates = transformedCordinates([25.194365, 55.241362]);
    const toMatch = { lat: 25.194365, lng: 55.241362 };

    expect(cordinates).toMatchObject(toMatch);
  });
});
