import React from 'react';
import { act, render } from 'react-testing-library';
import BottomSheetComponent from '..';

describe('BottomSheet', () => {
  beforeEach(() => {
    window.MutationObserver = require('@sheerun/mutationobserver-shim');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const props = {
    open: true,
    blocking: false,
    snapPoints: ({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9],
  };

  it('Should Render BottomSheet', () => {
    const { getByTestId, getByRole } = render(
      <BottomSheetComponent {...props}>
        <span data-testid="test">Testing</span>
      </BottomSheetComponent>,
    );

    act(() => {
      expect(getByRole('dialog')).toMatchSnapshot();
    });

    const elem = getByTestId('test');
    expect(elem).toBeTruthy();
  });
  it('Should Render Footer', () => {
    const { getByTestId, getByRole } = render(
      <BottomSheetComponent
        {...props}
        footer={<span data-testid="footer">Footer</span>}
      >
        <span data-testid="test">Testing</span>
      </BottomSheetComponent>,
    );

    act(() => {
      expect(getByRole('dialog')).toMatchSnapshot();
    });

    const elem = getByTestId('footer');
    expect(elem).toBeTruthy();
  });
  it('Should Render Header', () => {
    const { getByTestId, getByRole } = render(
      <BottomSheetComponent
        {...props}
        footer={<span data-testid="header">Header</span>}
      >
        <span data-testid="test">Testing</span>
      </BottomSheetComponent>,
    );

    act(() => {
      expect(getByRole('dialog')).toMatchSnapshot();
    });

    const elem = getByTestId('header');
    expect(elem).toBeTruthy();
  });
});
