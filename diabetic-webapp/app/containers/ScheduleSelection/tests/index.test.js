import { render, fireEvent, wait } from 'react-testing-library';
import { act } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import React from 'react';
import * as pharmacyApis from 'apis/pharmacy';
import * as ordersApi from '../../../apis/orders';
import ScheduleSelection from '../index';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    prescriptionNumber: 'mock-presc-number',
  }),
}));

describe('<ScheduleSelection/>', () => {
  const mockLocation = {
    state: {
      address: {
        flatVillaNumber: '403',
        formattedText: 'Rawdha 2 Ajman, United Arab Emirates',
        buildingName: 'New Villa Address',
        userNotes: 'Get the Directions here',
        latitude: 25.38671,
        longitude: 55.50892,
      },
    },
  };

  const mockDeliveryHours = {
    workinghours: {
      '0': null,
      '1': ['09:30:00', '11:00:00', '12:00:00', '17:00:00'],
      '2': ['09:30:00', '17:00:00'],
      '3': ['09:30:00', '13:00:00'],
      '4': ['09:30:00', '12:00:00', '13:00:00', '17:00:00'],
      '5': ['09:30:00', '17:00:00'],
      '6': null,
    },
    holidays: ['2015-05-04', '*-05-25'],
  };

  const mockPharmacyDetails = {
    pharmacyName: 'MPC',
    supportContactNumber: '8008080',
    deliveryHours: mockDeliveryHours,
    scheduleWindowDays: 7,
  };

  let mockHistory;
  let mockProps;

  let initializeOrderSpy;
  let fetchPharmacyDetailsSpy;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-10-03T00:00:00.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    mockProps = { location: mockLocation, history: mockHistory };
    initializeOrderSpy = jest.spyOn(ordersApi, 'initializeOrder');
    fetchPharmacyDetailsSpy = jest
      .spyOn(pharmacyApis, 'fetchPharmacyDetails')
      .mockResolvedValue(mockPharmacyDetails);
  });

  afterEach(() => {
    initializeOrderSpy.mockRestore();
    fetchPharmacyDetailsSpy.mockRestore();
    mockHistory = null;
    mockHistory = null;
  });
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ScheduleSelection {...mockProps} />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should disable the continue button when the date and time is not entered', () => {
    act(() => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ScheduleSelection {...mockProps} />
        </IntlProvider>,
      );

      const continueButton = getByTestId(/submit-btn/i);
      const { disabled } = continueButton;

      expect(disabled).toBeTruthy();
    });
  });

  const expandTimePicker = tree => {
    const timePickerHeader = tree.getAllByTestId(
      'collapsible-header-container',
    )[1];
    fireEvent.click(timePickerHeader);
  };

  const clickTimeCell = (tree, time) => {
    const timeCell = tree.getByTestId(`div-timepicker-cell-container-${time}`);
    fireEvent.click(timeCell);
  };

  it('should navigate to the summary page when next button is clicked', async () => {
    let tree;

    act(() => {
      tree = render(
        <IntlProvider locale="en">
          <ScheduleSelection {...mockProps} />
        </IntlProvider>,
      );
    });
    initializeOrderSpy.mockResolvedValue({});

    expandTimePicker(tree);
    tree.rerender(
      <IntlProvider locale="en">
        <ScheduleSelection {...mockProps} />
      </IntlProvider>,
    );

    const time = '10:00';

    clickTimeCell(tree, time);

    tree.rerender(
      <IntlProvider locale="en">
        <ScheduleSelection {...mockProps} />
      </IntlProvider>,
    );

    const continueButton = tree.getByTestId(/submit-btn/i);
    fireEvent.click(continueButton);
    const expectedSchedule = new Date();
    expectedSchedule.setHours(10);
    expectedSchedule.setMinutes(0);
    const expectedScheduleStr = expectedSchedule.toISOString();
    const { address } = mockLocation.state;
    const expectedAddress = {
      flatOrVillaNumber: address.flatVillaNumber,
      buildingOrVilla: address.buildingName,
      street: address.formattedText,
      directions: address.userNotes,
      latitude: address.latitude,
      longitude: address.longitude,
    };

    jest.runAllTimers();

    await wait(() => {
      expect(initializeOrderSpy).toBeCalledWith({
        address: expectedAddress,
        prescriptionNumber: 'mock-presc-number',
        schedule: expect.stringMatching(
          expectedScheduleStr.substr(0, expectedScheduleStr.lastIndexOf(':')),
        ),
      });
      expect(mockHistory.push).toBeCalledWith({
        pathname: 'summary',
      });
    });
  });

  it('should not navigate to the summary page when api returns an error', async () => {
    let tree;

    act(() => {
      tree = render(
        <IntlProvider locale="en">
          <ScheduleSelection {...mockProps} />
        </IntlProvider>,
      );
    });
    initializeOrderSpy.mockRejectedValue(new Error());

    expandTimePicker(tree);
    tree.rerender(
      <IntlProvider locale="en">
        <ScheduleSelection {...mockProps} />
      </IntlProvider>,
    );

    const time = '10:00';

    clickTimeCell(tree, time);

    tree.rerender(
      <IntlProvider locale="en">
        <ScheduleSelection {...mockProps} />
      </IntlProvider>,
    );

    const continueButton = tree.getByTestId(/submit-btn/i);
    fireEvent.click(continueButton);
    jest.runAllTimers();
    // await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockHistory.push).not.toBeCalled();
  });
});
