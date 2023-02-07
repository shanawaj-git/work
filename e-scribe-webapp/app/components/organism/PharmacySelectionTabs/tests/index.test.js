import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { act } from 'react-test-renderer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

// eslint-disable-next-line import/first
import PharmacySelectionTabs, {
  DefaultPages,
  PARAM_KEY_PREVIOUS_LOCATION_DATA,
  PharmacySelectionTab,
} from '../index';

// eslint-disable-next-line react/prop-types
const MockPharmacySelectionTabs = ({ activeTab }) => (
  <BrowserRouter>
    <IntlProvider locale="en">
      <PharmacySelectionTabs activeTab={activeTab} />
    </IntlProvider>
  </BrowserRouter>
);
describe('<PharmacySelectionTabs />', () => {
  const prescriptionNumber = '123456789';
  const basePath = `/prescriptions/${prescriptionNumber}`;
  const currentPath = `${basePath}/delivery/address-selection`;
  let mockHistory;
  let mockUseLocation;

  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    // eslint-disable-next-line global-require
    // mockUseLocation = require('react-router-dom').useLocation;
    // eslint-disable-next-line global-require
    mockUseLocation = require('react-router-dom').useLocation.mockReturnValue({
      pathname: currentPath,
    });
    // eslint-disable-next-line global-require
    require('react-router-dom').useHistory.mockReturnValue(mockHistory);
    // eslint-disable-next-line global-require
    require('react-router-dom').useParams.mockReturnValue({
      prescriptionNumber,
    });
  });

  afterEach(() => {
    mockHistory = null;
    // mockUseLocation = null;
  });

  it('should render and match the snapshot for Delivery Tab', () => {
    const {
      container: { firstChild },
    } = render(
      <MockPharmacySelectionTabs activeTab={PharmacySelectionTab.Delivery} />,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot for Click & Collect Tab', () => {
    const {
      container: { firstChild },
    } = render(
      <MockPharmacySelectionTabs
        activeTab={PharmacySelectionTab.ClickAndCollect}
      />,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should navigate to the default page in Click & Collect tab on click', () => {
    act(() => {
      render(
        <MockPharmacySelectionTabs activeTab={PharmacySelectionTab.Delivery} />,
      );
    });
    const clickNCollectTab = document.querySelector(
      `[data-testid="${PharmacySelectionTab.ClickAndCollect}"]`,
    );

    fireEvent.click(
      clickNCollectTab,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockHistory.push).toBeCalledWith({
      pathname: `${basePath}${
        DefaultPages[PharmacySelectionTab.ClickAndCollect]
      }`,
      state: {
        [PARAM_KEY_PREVIOUS_LOCATION_DATA]: {
          pathname: currentPath,
        },
      },
    });
  });

  it('should navigate to the default page in Delivery tab on click', () => {
    act(() => {
      render(
        <MockPharmacySelectionTabs
          activeTab={PharmacySelectionTab.ClickAndCollect}
        />,
      );
    });
    const deliveryTab = document.querySelector(
      `[data-testid="${PharmacySelectionTab.Delivery}"]`,
    );

    fireEvent.click(
      deliveryTab,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockHistory.push).toBeCalledWith({
      pathname: `${basePath}${DefaultPages[PharmacySelectionTab.Delivery]}`,
      state: {
        [PARAM_KEY_PREVIOUS_LOCATION_DATA]: {
          pathname: currentPath,
        },
      },
    });
  });
  it('should navigate to the previous page in target tab on click when PARAM_KEY_PREVIOUS_LOCATION_DATA is present', () => {
    const prevLocationData = {
      pathname: '/some/dummy/path',
      state: {
        dummyProp1: 'dummyProp1',
        dummyProp2: 'dummyProp2',
      },
    };
    mockUseLocation.mockReturnValue({
      pathname: currentPath,
      state: {
        [PARAM_KEY_PREVIOUS_LOCATION_DATA]: prevLocationData,
      },
    });
    act(() => {
      render(
        <MockPharmacySelectionTabs
          activeTab={PharmacySelectionTab.ClickAndCollect}
        />,
      );
    });
    const deliveryTab = document.querySelector(
      `[data-testid="${PharmacySelectionTab.Delivery}"]`,
    );

    fireEvent.click(
      deliveryTab,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockHistory.push).toBeCalledWith({
      pathname: prevLocationData.pathname,
      state: {
        ...prevLocationData.state,
        [PARAM_KEY_PREVIOUS_LOCATION_DATA]: {
          pathname: currentPath,
          state: {},
        },
      },
    });
  });
});
