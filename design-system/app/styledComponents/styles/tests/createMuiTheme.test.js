import * as dependency from '@mui/material/styles';

import { createMaterialUiTheme } from '../createMuiTheme';

jest.mock('@mui/material/styles', () => ({
  createTheme: jest
    .fn()
    .mockImplementation(() => ({ theme: { color: 'red' } })),
}));
describe('createMuiTheme', () => {
  const input = {
    breakpoint: [],
    color: 'red',
    overrides: [
      {
        background: 'yellow',
      },
    ],
  };
  it('creates theme successfully', () => {
    const getRequestMock = jest.spyOn(dependency, 'createTheme');

    dependency.createTheme = jest.fn();
    expect(createMaterialUiTheme(input)).toMatchSnapshot();
    expect(getRequestMock).toHaveBeenCalledTimes(1);
  });
});
