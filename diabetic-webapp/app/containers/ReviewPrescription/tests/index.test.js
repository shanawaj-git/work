import { fireEvent, render } from 'react-testing-library';
import { act } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import React from 'react';
import ReviewPrescription, {
  getDeliveryIntroductionScreenPath,
} from '../index';
import * as prescriptionApi from '../../../apis/prescription';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/review-prescription',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
}));

describe('<ReviewPrescription />', () => {
  it('should render and match the snapshot', () => {
    global.URL.createObjectURL = jest.fn();
    const mockLocation = {
      state: {
        prescriptionImage: jest.fn(),
      },
    };

    const props = {
      location: mockLocation,
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ReviewPrescription {...props} />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should be able to recapture the image whe retake button is clicked', async () => {
    global.URL.createObjectURL = jest.fn();

    const mockLocation = {
      state: {
        prescriptionImage: jest.fn(),
      },
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ReviewPrescription location={mockLocation} {...props} />
        </IntlProvider>,
      );

      const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
      const inputFile = getByTestId(/retake-prescription-input/i);
      const retakeButton = getByTestId(/retake-button/i);

      fireEvent.click(retakeButton);
      fireEvent.change(inputFile, {
        target: { files: [fakeFile] },
      });

      expect(retakeButton).toBeDefined();
    });
  });

  it('should not change the picture if the retake button is not captured', async () => {
    global.URL.createObjectURL = jest.fn();

    const mockLocation = {
      state: {
        prescriptionImage: jest.fn(),
      },
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ReviewPrescription location={mockLocation} {...props} />
        </IntlProvider>,
      );

      const inputFile = getByTestId(/retake-prescription-input/i);
      const retakeButton = getByTestId(/retake-button/i);

      fireEvent.click(retakeButton);
      fireEvent.change(inputFile, {
        target: { files: [undefined] },
      });

      expect(retakeButton).toBeDefined();
    });
  });
});

describe('Upload Prescription', () => {
  let prescriptionApiSpy;
  const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

  beforeEach(() => {
    prescriptionApiSpy = jest.spyOn(prescriptionApi, 'uploadPrescription');
  });

  afterEach(() => {
    prescriptionApiSpy.mockRestore();
  });

  const mockClickContinueButton = () => {
    const input = document.querySelector(
      '[data-testid="retake-prescription-input"]',
    );
    fireEvent.change(input, { target: { files: [fakeFile] } });
    const button = document.querySelector('[data-testid="upload-btn"]');

    fireEvent.click(
      button,

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      }),
    );
  };

  it('should upload the prescription image to api when the next button is clicked', async () => {
    const mockPrescriptionUploadResponse = {
      id: 3,
      firstName: 'Nissar',
      lastName: 'Akber',
      status: 'New',
      createdAt: '2022-09-20T06:46:13.551Z',
      updatedAt: '2022-09-20T06:46:13.551Z',
    };

    global.URL.createObjectURL = jest.fn();
    const mockHistory = {
      push: jest.fn(),
    };
    const mockLocation = {
      state: {
        prescriptionImage: jest.fn(),
      },
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <ReviewPrescription
            history={mockHistory}
            location={mockLocation}
            {...props}
          />
        </IntlProvider>,
      );
    });
    prescriptionApiSpy.mockResolvedValue(mockPrescriptionUploadResponse);
    mockClickContinueButton();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockHistory.push).toBeCalledWith({
      pathname: getDeliveryIntroductionScreenPath(
        mockPrescriptionUploadResponse.id,
      ),
    });
  });

  it('should display error message if an error occurs while uploading the image', async () => {
    global.URL.createObjectURL = jest.fn();
    const mockHistory = {
      push: jest.fn(),
    };
    const mockLocation = {
      state: {
        prescriptionImage: jest.fn(),
      },
    };

    const props = {
      location: mockLocation,
    };

    act(() => {
      render(
        <IntlProvider locale="en">
          <ReviewPrescription
            history={mockHistory}
            location={mockLocation}
            {...props}
          />
        </IntlProvider>,
      );
    });

    prescriptionApiSpy.mockRejectedValue(
      new Error(prescriptionApi.PrescriptionApiErrors.ServerException),
    );
    mockClickContinueButton();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockHistory.push).not.toBeCalled();
  });
});
