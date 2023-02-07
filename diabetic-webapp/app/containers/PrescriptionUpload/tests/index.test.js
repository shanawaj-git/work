import { fireEvent, render } from 'react-testing-library';
import { act } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import React from 'react';
import PrescriptionUpload from '../index';
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/prescription-upload',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
}));

describe('<PrescriptionUpload />', () => {
  it('should render and match the snapshot', () => {
    const mockLocation = {
      search: '',
    };

    const props = {
      location: mockLocation,
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <PrescriptionUpload {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should select and upload the prescription when upload button is clicked', async () => {
    global.URL.createObjectURL = jest.fn();
    const mockHistory = {
      push: jest.fn(),
    };
    const mockLocation = {
      search: '',
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <PrescriptionUpload history={mockHistory} {...props} />
        </IntlProvider>,
      );

      const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
      const inputFile = getByTestId(/prescription-input/i);
      const uploadButton = getByTestId(/prescription-button/i);

      fireEvent.click(uploadButton);
      fireEvent.change(inputFile, {
        target: { files: [fakeFile] },
      });

      expect(mockHistory).toBeDefined();
      expect(inputFile).toBeDefined();
    });
  });

  it('should not proceed to the next screen when no image file is selected', async () => {
    const mockHistory = {
      push: jest.fn(),
    };
    const mockLocation = {
      search: '',
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <PrescriptionUpload history={mockHistory} {...props} />
        </IntlProvider>,
      );

      const inputFile = getByTestId(/prescription-input/i);
      const uploadButton = getByTestId(/prescription-button/i);

      fireEvent.click(uploadButton);
      fireEvent.change(inputFile, {
        target: { files: [undefined] },
      });

      expect(mockHistory).toBeDefined();
      expect(mockHistory.push).not.toBeCalled();
    });
  });
});
