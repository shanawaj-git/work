import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CollapsibleFieldContainer from '../index';
import timeIcon from '../../../images/time-icon.svg';

describe('CollapsibleFieldContainer', () => {
  const props = {
    label: 'Time',
    value: '10.00',
    placeholder: 'Select Time',
    icon: timeIcon,
    openByDefault: null,
  };
  it('Should render in closed mode', () => {
    const tree = render(
      <CollapsibleFieldContainer {...props}>
        <div data-testid="test-content">Test content</div>
      </CollapsibleFieldContainer>,
    );
    expect(tree).toBeTruthy();
    expect(tree.container).toMatchSnapshot();
  });

  it('Should render in open mode', () => {
    const tree = render(
      <CollapsibleFieldContainer {...props} openByDefault>
        <div data-testid="test-content">Test content</div>
      </CollapsibleFieldContainer>,
    );
    expect(tree).toBeTruthy();
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByTestId('test-content')).toBeTruthy();
  });

  it('Should toggle the collapsible state on click of the header', () => {
    const tree = render(
      <CollapsibleFieldContainer {...props} openByDefault={false}>
        <div data-testid="test-content">Test content</div>
      </CollapsibleFieldContainer>,
    );
    const header = tree.getByTestId('collapsible-header-container');
    fireEvent(
      header,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    tree.rerender(
      <CollapsibleFieldContainer {...props} openByDefault={false}>
        <div data-testid="test-content">Test content</div>
      </CollapsibleFieldContainer>,
    );
    expect(tree.getByTestId('test-content')).toBeTruthy();
  });

  it('should take place holder if value is not present', () => {
    const tree = render(
      <CollapsibleFieldContainer {...props} value="" openByDefault={false}>
        <div data-testid="test-content">Test content</div>
      </CollapsibleFieldContainer>,
    );
    expect(tree).toBeTruthy();
    expect(tree.container).toMatchSnapshot();
  });
});
