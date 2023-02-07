import { LOGIN_SELECTION_PATH, logout } from 'logout';

describe('logout', () => {
  it('navigates to the phone login screen', () => {
    const mockHistory = {
      push: jest.fn(),
    };
    logout(mockHistory);
    expect(mockHistory.push).toBeCalledWith({
      pathname: LOGIN_SELECTION_PATH,
      state: { referrer: '/' },
    });
  });
});
