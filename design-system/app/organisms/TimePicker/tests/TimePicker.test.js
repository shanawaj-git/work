import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import TimePicker from '../index';

describe('TimePicker', () => {
  const props = {
    value: null,
    fromTime: '07:00',
    toTime: '20:00',
    interval: '01:00',
    onChange: () => {},
    label: 'Time',
    placeholder: 'Select Time',
    shouldDisableTime: null,
    openByDefault: true,
  };
  const testValue = '10:00';

  it('Should render successfully in closed mode', () => {
    const tree = render(<TimePicker {...props} openByDefault={false} />);
    expect(tree).toBeTruthy();
    expect(tree.container).toMatchSnapshot();
  });

  it('Should render successfully in open mode', async () => {
    const tree = render(<TimePicker {...props} />);

    await waitForElement(() =>
      tree.getByTestId(`div-timepicker-cell-container-${testValue}`),
    );
    expect(tree).toBeTruthy();
    expect(tree.container).toMatchSnapshot();
  });

  it("Should invoke 'onChange' on click of a cell with the cell value", async () => {
    const onChange = jest.fn();
    const tree = render(<TimePicker {...props} onChange={onChange} />);
    await waitForElement(() =>
      tree.getByTestId(`div-timepicker-cell-container-${testValue}`),
    );
    const button = tree.getByTestId(
      `div-timepicker-cell-container-${testValue}`,
    );
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onChange).toBeCalledWith(testValue);
  });
  it("Should not invoke 'onChange' on click of a disabled cell ", async () => {
    const onChange = jest.fn();
    const disabledValue = '10:00';
    const tree = render(
      <TimePicker
        {...props}
        onChange={onChange}
        shouldDisableTime={time => time === disabledValue}
      />,
    );
    await waitForElement(() =>
      tree.getByTestId(`div-timepicker-cell-container-${testValue}`),
    );
    const button = tree.getByTestId(
      `div-timepicker-cell-container-${disabledValue}`,
    );
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onChange).not.toBeCalled();
  });
});
